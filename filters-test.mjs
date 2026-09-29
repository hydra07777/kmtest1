import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 740 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", e => errors.push(e.message));
await page.goto("http://127.0.0.1:4173/pages/search.html", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// 1) Vérifier que le toggle est visible
const toggleVisible = await page.isVisible(".filters__toggle");
console.log("✓ toggle visible (mobile):", toggleVisible);

// 2) Vérifier que le body est caché par défaut
const bodyHidden = await page.$eval("#filters-body", el => !el.classList.contains("is-open"));
console.log("✓ body caché par défaut:", bodyHidden);

// Capture état initial
await page.screenshot({ path: "shots/search-mobile-collapsed.png" });

// 3) Cliquer sur le toggle pour ouvrir
await page.click(".filters__toggle");
await page.waitForTimeout(400);
const bodyOpen = await page.$eval("#filters-body", el => el.classList.contains("is-open"));
console.log("✓ body ouvert après clic:", bodyOpen);
await page.screenshot({ path: "shots/search-mobile-open.png" });

// 4) Cliquer sur un chip (Catégorie: Restaurants)
await page.click('[data-cat="restaurant"]');
await page.waitForTimeout(300);
const countActive = await page.$eval("#filters-count", el => el.textContent);
console.log("✓ compteur filtres actifs:", countActive);

// 5) Cliquer sur Quartier: Gombe
await page.click('[data-q="gombe"]');
await page.waitForTimeout(300);
const countActive2 = await page.$eval("#filters-count", el => el.textContent);
console.log("✓ compteur après 2 filtres:", countActive2);
await page.screenshot({ path: "shots/search-mobile-filters-active.png" });

// 6) Cliquer à nouveau sur le toggle pour fermer
await page.click(".filters__toggle");
await page.waitForTimeout(400);
const bodyClosed = await page.$eval("#filters-body", el => !el.classList.contains("is-open"));
console.log("✓ body refermé:", bodyClosed);

console.log("Erreurs:", errors);
await browser.close();