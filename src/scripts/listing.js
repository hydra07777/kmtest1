// listing.js — Logique de la page listing.html
import { phares, pharePhotos, phareGalleries, sampleReviews } from "./data.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id") || phares[0].id;
const p = phares.find(x => x.id === id) || phares[0];

const heroUrl = pharePhotos[p.id] || pharePhotos["mama-koko"];
const heroVisual = document.getElementById("hero-visual");
if (heroVisual) {
  heroVisual.innerHTML = `
    <img src="${heroUrl}" alt="${p.title}" />
    <div class="listing-hero__overlay"></div>
  `;
}

const metaRow = document.getElementById("meta-row");
if (metaRow) {
  metaRow.innerHTML = `
    <span class="badge badge--ocean badge-dot">Hôte vérifié</span>
    <span class="meta-item">★ 4.${Math.floor(Math.random()*9)+1} · 124 avis</span>
    <span class="meta-item mono">${p.meta}</span>
  `;
}

const titleEl = document.getElementById("listing-title");
if (titleEl) titleEl.textContent = p.title;

const descEl = document.getElementById("listing-desc");
if (descEl) descEl.textContent =
  "Un lieu emblématique du quartier, plébiscité par les Kinois et les visiteurs. Ambiance authentique, cuisine locale, service attentionné — tout est là pour un séjour mémorable au cœur de Kinshasa.";

const priceEl = document.getElementById("booking-price");
if (priceEl) {
  priceEl.innerHTML = `${(p.price || 0).toLocaleString("fr-FR")} CDF <small>/ ${p.meta.includes("Hôtel") ? "nuit" : "personne"}</small>`;
}

const am = ["Wifi gratuit", "Climatisation", "Petit-déjeuner inclus", "Paiement Airtel Money", "Accueil 24/7", "Annulation 24h", "Parking sécurisé", "Eau chaude"];
const amenitiesEl = document.getElementById("amenities");
if (amenitiesEl) {
  amenitiesEl.innerHTML = am.map(a => `
    <div class="amenity">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12 L 11 18 L 20 7"/></svg>
      ${a}
    </div>
  `).join("");
}

const galImgs = phareGalleries[p.id] || phareGalleries["mama-koko"];
const galleryEl = document.getElementById("gallery");
if (galleryEl) {
  galleryEl.innerHTML = galImgs.map((src, i) => `
    <div class="gallery__item" style="background-image: url('${src}');">
      <div class="gallery__overlay">${["Salle principale", "Terrasse", "Bar"][i] || "Vue " + (i+1)}</div>
    </div>
  `).join("");
}

const reviewsEl = document.getElementById("reviews");
if (reviewsEl) {
  reviewsEl.innerHTML = sampleReviews.map(r => `
    <article class="review">
      <div class="review__head">
        <div class="review__avatar">${r.initials}</div>
        <div>
          <div class="review__name">${r.name}</div>
          <div class="review__role">${r.role}</div>
        </div>
        <div class="review__stars">${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</div>
      </div>
      <p class="review__text">${r.text}</p>
    </article>
  `).join("");
}