// search.js — Logique de la page search.html (filtres + grille de résultats)
import { phares, quartiers, catPhotos } from "./data.js";

const params = new URLSearchParams(window.location.search);
const urlCat = params.get("cat");

let activeCat = urlCat || "all";
let activeQuartier = "all";
let activePrice = "all";

const catLabels = {
  all: "Tout", hotel: "Hôtels", restaurant: "Restaurants", cafe: "Cafés", experience: "Expériences", evenement: "Événements"
};

const catChips = document.getElementById("cat-chips");
if (catChips) {
  catChips.innerHTML = Object.keys(catLabels).map(k =>
    `<button class="filters__chip ${activeCat === k ? "is-active" : ""}" data-cat="${k}">${catLabels[k]}</button>`
  ).join("");
}

const qChips = document.getElementById("q-chips");
if (qChips) {
  qChips.innerHTML = `<button class="filters__chip is-active" data-q="all">Tous</button>` +
    quartiers.slice(0, 6).map(q =>
      `<button class="filters__chip" data-q="${q.id}">${q.name}</button>`
    ).join("");
}

function render() {
  const list = phares.filter(p => {
    const qOk = activeQuartier === "all" || p.meta.toLowerCase().includes(activeQuartier);
    let pOk = true;
    if (activePrice === "low")  pOk = p.price > 0 && p.price <= 5000;
    if (activePrice === "mid")  pOk = p.price > 5000 && p.price <= 15000;
    if (activePrice === "high") pOk = p.price > 15000;
    let cOk = activeCat === "all";
    if (activeCat === "hotel")      cOk = /Hôtel/.test(p.meta);
    if (activeCat === "restaurant") cOk = /Restaurant/.test(p.meta);
    if (activeCat === "cafe")       cOk = /Café/.test(p.meta);
    if (activeCat === "experience") cOk = /Expérience/.test(p.meta);
    if (activeCat === "evenement")  cOk = /Événement/.test(p.meta);
    return qOk && pOk && cOk;
  });

  document.getElementById("results-count").textContent = `${list.length} lieux`;

  // Compteur de filtres actifs
  const countEl = document.getElementById("filters-count");
  if (countEl) {
    let n = 0;
    if (activeCat !== "all") n++;
    if (activeQuartier !== "all") n++;
    if (activePrice !== "all") n++;
    countEl.textContent = n > 0 ? String(n) : "0";
    countEl.classList.toggle("is-active", n > 0);
  }

  const results = document.getElementById("results");
  if (!results) return;
  if (!list.length) {
    results.innerHTML = `<div class="empty-state"><h3>Aucun résultat</h3><p>Essaie d'élargir tes filtres.</p></div>`;
    return;
  }
  results.innerHTML = list.map(p => {
    let img = catPhotos.experience;
    if (/Hôtel/.test(p.meta)) img = catPhotos.hotel;
    else if (/Restaurant/.test(p.meta)) img = catPhotos.restaurant;
    else if (/Café/.test(p.meta)) img = catPhotos.cafe;
    else if (/Événement/.test(p.meta)) img = catPhotos.evenement;

    return `
      <a href="/listing.html?id=${p.id}" class="result-card">
        <div class="result-card__media" style="background-image: url('${img}');"></div>
        <div class="result-card__body">
          <span class="badge badge--ocean">Hôte vérifié</span>
          <div class="result-card__title">${p.title}</div>
          <div class="result-card__meta">★ 4.${Math.floor(Math.random()*9)+1} · ${p.meta}</div>
          <div class="result-card__price">${p.price ? p.price.toLocaleString("fr-FR") + " <span>CDF</span>" : "Gratuit"}</div>
        </div>
      </a>
    `;
  }).join("");
}

document.querySelectorAll("[data-cat]").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-cat]").forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");
    activeCat = b.dataset.cat;
    render();
  });
});
document.querySelectorAll("[data-q]").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-q]").forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");
    activeQuartier = b.dataset.q === "all" ? "all" : b.dataset.q;
    render();
  });
});
document.querySelectorAll("[data-price]").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-price]").forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");
    activePrice = b.dataset.price;
    render();
  });
});

// Toggle des filtres (mobile)
const toggle = document.querySelector(".filters__toggle");
const body = document.getElementById("filters-body");
if (toggle && body) {
  const syncFromViewport = () => {
    if (window.matchMedia("(min-width: 961px)").matches) {
      body.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    } else {
      body.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  };
  syncFromViewport();
  window.addEventListener("resize", syncFromViewport);

  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

render();