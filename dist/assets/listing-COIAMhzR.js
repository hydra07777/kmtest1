import"./nav-C1bK3fkt.js";import{p as t,a as s,b as n,s as p}from"./data-BdpePb1c.js";const g=new URLSearchParams(window.location.search),h=g.get("id")||t[0].id,i=t.find(e=>e.id===h)||t[0],w=s[i.id]||s["mama-koko"],l=document.getElementById("hero-visual");l&&(l.innerHTML=`
    <img src="${w}" alt="${i.title}" />
    <div class="listing-hero__overlay"></div>
  `);const o=document.getElementById("meta-row");o&&(o.innerHTML=`
    <span class="badge badge--ocean badge-dot">Hôte vérifié</span>
    <span class="meta-item">★ 4.${Math.floor(Math.random()*9)+1} · 124 avis</span>
    <span class="meta-item mono">${i.meta}</span>
  `);const r=document.getElementById("listing-title");r&&(r.textContent=i.title);const c=document.getElementById("listing-desc");c&&(c.textContent="Un lieu emblématique du quartier, plébiscité par les Kinois et les visiteurs. Ambiance authentique, cuisine locale, service attentionné — tout est là pour un séjour mémorable au cœur de Kinshasa.");const d=document.getElementById("booking-price");d&&(d.innerHTML=`${(i.price||0).toLocaleString("fr-FR")} CDF <small>/ ${i.meta.includes("Hôtel")?"nuit":"personne"}</small>`);const _=["Wifi gratuit","Climatisation","Petit-déjeuner inclus","Paiement Airtel Money","Accueil 24/7","Annulation 24h","Parking sécurisé","Eau chaude"],m=document.getElementById("amenities");m&&(m.innerHTML=_.map(e=>`
    <div class="amenity">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12 L 11 18 L 20 7"/></svg>
      ${e}
    </div>
  `).join(""));const y=n[i.id]||n["mama-koko"],v=document.getElementById("gallery");v&&(v.innerHTML=y.map((e,a)=>`
    <div class="gallery__item" style="background-image: url('${e}');">
      <div class="gallery__overlay">${["Salle principale","Terrasse","Bar"][a]||"Vue "+(a+1)}</div>
    </div>
  `).join(""));const u=document.getElementById("reviews");u&&(u.innerHTML=p.map(e=>`
    <article class="review">
      <div class="review__head">
        <div class="review__avatar">${e.initials}</div>
        <div>
          <div class="review__name">${e.name}</div>
          <div class="review__role">${e.role}</div>
        </div>
        <div class="review__stars">${"★".repeat(e.stars)}${"☆".repeat(5-e.stars)}</div>
      </div>
      <p class="review__text">${e.text}</p>
    </article>
  `).join(""));
