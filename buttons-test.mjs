import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", e => errors.push(e.message));
await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// 1) CTA hero "Request a Demo" → /search.html
const heroCta = await page.$('a.hero__cta');
const heroHref = await heroCta.getAttribute("href");
console.log("✓ hero CTA href:", heroHref);
await heroCta.click();
await page.waitForURL(/search/, { timeout: 5000 });
console.log("✓ navigation hero CTA OK:", page.url());

// 2) Bouton "Search" dans la search-glass bar
await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const searchBtn = await page.$('.search-glass__btn');
await searchBtn.click();
await page.waitForURL(/search/, { timeout: 5000 });
console.log("✓ search-glass btn navigation OK");

// 3) CTA final "Commencer" → /search.html
await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
// Scroll to CTA section
await page.evaluate(() => document.querySelector('.cta').scrollIntoView());
await page.waitForTimeout(500);
const ctaButtons = await page.$$('.cta__actions a');
console.log("✓ CTA actions count:", ctaButtons.length);
const commencer = ctaButtons[0];
const ctaHref = await commencer.getAttribute("href");
console.log("✓ 'Commencer' href:", ctaHref);
await commencer.click();
await page.waitForURL(/search/, { timeout: 5000 });
console.log("✓ navigation 'Commencer' OK");

console.log("Erreurs:", errors);
await browser.close();