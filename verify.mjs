// verify.mjs — Script Playwright de vérification Keliabe
// Lance : node verify.mjs
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const PAGES = [
  { name: "index",        url: "/" },
  { name: "search",       url: "/search.html" },
  { name: "listing",      url: "/listing.html" },
  { name: "booking",      url: "/booking.html" },
  { name: "confirmation", url: "/confirmation.html" }
];

const VIEWPORTS = [
  { tag: "desktop", width: 1280, height: 800 },
  { tag: "mobile",  width: 375,  height: 740 }
];

const SHOTS_DIR = "shots";
fs.mkdirSync(SHOTS_DIR, { recursive: true });

const base = "http://127.0.0.1:4173";

let totals = { errors: 0, warnings: 0, overflow: 0, smallTouch: 0, missing: 0 };

async function check(page, name, url, tag) {
  const r = { name, url, tag, consoleErrors: [], failedRequests: [], overflow: 0, smallTouch: [] };
  page.on("console", m => { if (m.type() === "error") r.consoleErrors.push(m.text()); });
  page.on("pageerror", e => r.consoleErrors.push("pageerror: " + e.message));
  page.on("requestfailed", req => {
    const url = req.url();
    if (url.startsWith(base)) r.failedRequests.push(url);
  });
  page.on("response", resp => {
    const u = resp.url();
    if (u.startsWith(base) && resp.status() >= 400) r.failedRequests.push(`${resp.status()} ${u}`);
  });
  await page.goto(`${base}${url}`, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForTimeout(2500); // attendre GSAP + photos Unsplash

  // Attendre que les animations aient atteint leur état final
  await page.waitForTimeout(1500);

  // Pour la landing : scroller pour déclencher tous les ScrollTrigger
  // puis remonter en haut pour la capture hero
  if (name === "index") {
    const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < totalH; y += 600) {
      await page.evaluate(yy => window.scrollTo(0, yy), y);
      await page.waitForTimeout(180);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  }

  // Overflow horizontal
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  r.overflow = overflow;

  // Cibles tactiles trop petites (mobile)
  if (tag === "mobile") {
    const small = await page.$$eval("button, a, input, select, [role=button]", els =>
      els.filter(el => {
        const r = el.getBoundingClientRect();
        const lbl = el.labels && el.labels[0];
        const lr = lbl ? lbl.getBoundingClientRect() : null;
        const h = Math.max(r.height, lr ? lr.height : 0);
        // Hauteur minimum 44px. Largeur < 44 OK si c'est un texte long dans une row
        // On ne signale que si la zone interactive est trop petite en hauteur
        return r.width > 0 && h > 0 && h < 44 && r.width > 20;
      }).map(el => {
        const r = el.getBoundingClientRect();
        return `${el.tagName.toLowerCase()}.${el.className || ""} ${Math.round(r.width)}×${Math.round(r.height)}`;
      })
    );
    r.smallTouch = small;
  }

  // Capture (sans bloquer sur les fonts Google offline)
  const out = path.join(SHOTS_DIR, `${name}-${tag}.png`);
  try {
    await page.screenshot({ path: out, fullPage: true, timeout: 8000 });
  } catch (e) {
    console.log(`    ⚠ screenshot timeout (fonts?) — fallback viewport`);
    await page.screenshot({ path: out, fullPage: false, timeout: 8000 });
  }
  console.log(`  ✓ ${tag.padEnd(7)} → ${out}`);

  // Filtrer les erreurs réseau dues au blocage CDN (attendu en offline)
  const filtered = r.consoleErrors.filter(e => !e.includes("net::ERR_FAILED") && !e.includes("ERR_ABORTED"));
  if (filtered.length) { filtered.forEach(e => console.log(`    ⛔ console: ${e}`)); totals.errors += filtered.length; }
  if (r.failedRequests.length) { r.failedRequests.forEach(u => console.log(`    ⛔ req: ${u}`)); totals.missing += r.failedRequests.length; }
  if (r.overflow > 1) { console.log(`    ⚠ overflow: ${r.overflow}px`); totals.overflow++; }
  if (r.smallTouch.length) { r.smallTouch.slice(0, 5).forEach(s => console.log(`    ⚠ small: ${s}`)); totals.smallTouch += r.smallTouch.length; }
  return r;
}

async function parcours(page) {
  console.log("\n▶ Parcours landing → search → listing → booking → confirmation");
  // landing → search
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 15000 });
  await page.waitForTimeout(2000);
  const exploreBtn = await page.$(".search-glass__btn");
  await exploreBtn.click();
  await page.waitForURL(/search/, { timeout: 5000 });
  await page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => {});
  await page.waitForSelector(".results-grid .result-card", { timeout: 8000 });
  console.log("  ✓ landing → search");

  // search → listing
  const firstCard = await page.$(".results-grid .result-card");
  await firstCard.click();
  await page.waitForURL(/listing/, { timeout: 5000 });
  await page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => {});
  console.log("  ✓ search → listing");

  // listing → booking
  const reserveBtn = await page.$(".booking-card__cta");
  await reserveBtn.click();
  await page.waitForURL(/booking/, { timeout: 5000 });
  await page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => {});
  console.log("  ✓ listing → booking");

  // booking → confirmation
  const confirmBtn = await page.$(".booking-card__cta");
  await confirmBtn.click();
  await page.waitForURL(/confirmation/, { timeout: 5000 });
  await page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => {});
  console.log("  ✓ booking → confirmation");
}

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  console.log(`\n═══ ${vp.tag.toUpperCase()} (${vp.width}×${vp.height}) ═══`);
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  // Bloque les fonts Google (offline) pour éviter screenshot timeout
  await page.route("**/*", route => {
    const u = route.request().url();
    if (u.includes("fonts.googleapis.com") || u.includes("fonts.gstatic.com") || u.includes("images.unsplash.com")) {
      return route.abort();
    }
    return route.continue();
  });
  for (const p of PAGES) {
    await check(page, p.name, p.url, vp.tag);
  }
  if (vp.tag === "desktop") await parcours(page);
  await ctx.close();
}
await browser.close();

console.log("\n════════ RÉSUMÉ ════════");
console.log(`Erreurs console     : ${totals.errors}`);
console.log(`Ressources manquantes: ${totals.missing}`);
console.log(`Overflow horizontal : ${totals.overflow}`);
console.log(`Cibles < 44px        : ${totals.smallTouch}`);
console.log("════════════════════════\n");

if (totals.errors > 0 || totals.missing > 0) {
  process.exit(1);
}