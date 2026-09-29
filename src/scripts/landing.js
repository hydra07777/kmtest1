// landing.js — Rendu Bento + animations GSAP pour la landing
import { phares, testimonials } from "./data.js";
import { initNavScroll, heroIntro, heroParallax, staggerReveal, scrubText, parallaxY } from "./motion.js";

document.addEventListener("DOMContentLoaded", () => {
  // Animations nav
  initNavScroll(document.querySelector(".nav"));

  // Hero intro + parallax
  const hero = document.querySelector(".hero");
  if (hero) {
    heroIntro(hero);
    heroParallax(document.querySelector(".hero__visual"));
  }

  // Bento — vraies photos Unsplash
  const bentoEl = document.getElementById("bento");
  if (bentoEl) {
    const photoById = {
      "mama-koko":     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
      "memling":       "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop",
      "savon":         "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=80&auto=format&fit=crop",
      "kin-brasserie": "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=1200&q=80&auto=format&fit=crop",
      "pool-cruise":   "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=1200&q=80&auto=format&fit=crop",
      "marche-central":"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80&auto=format&fit=crop"
    };
    const labelById = {
      "mama-koko":     "Restaurant · Gombe",
      "memling":       "Hôtel · Gombe",
      "savon":         "Café · Bandal",
      "kin-brasserie": "Expérience · Limete",
      "pool-cruise":   "Expérience · Kintambo",
      "marche-central":"Événement · Lingwala"
    };
    bentoEl.innerHTML = phares.slice(0, 5).map(p => `
      <a href="/listing.html?id=${p.id}" class="bento__card">
        <div class="bento__card-media" style="background-image: url('${photoById[p.id] || photoById["mama-koko"]}');"></div>
        <div class="bento__card-body">
          <div class="bento__card-title">${p.title}</div>
          <div class="bento__card-meta">${labelById[p.id] || p.meta}${p.price ? " · " + p.price.toLocaleString("fr-FR") + " CDF" : ""}</div>
        </div>
      </a>
    `).join("");
  }

  // Testimonials
  const testiEl = document.getElementById("testi-grid");
  if (testiEl) {
    testiEl.innerHTML = testimonials.slice(0, 3).map(t => `
      <article class="glass-card">
        <p class="glass-card__quote">"${t.quote}"</p>
        <div class="glass-card__author">
          <div class="glass-card__avatar">${t.initials}</div>
          <div>
            <div class="glass-card__name">${t.name}</div>
            <div class="glass-card__role">${t.role}</div>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Animations scroll-triggerées
  if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    staggerReveal(document.querySelector(".why"), ".why__card", { stagger: 0.1 });
    const cats = document.querySelector(".categories");
    if (cats) {
      staggerReveal(cats, ".cat-tile", { stagger: 0.08 });
      parallaxY(cats.querySelectorAll(".cat-tile__bg"), -12);
    }
    const phares2 = document.querySelector(".phares");
    if (phares2) {
      staggerReveal(phares2, ".phares__card", { stagger: 0.1 });
      parallaxY(phares2.querySelectorAll(".phares__card"), -20);
    }
    // Témoignages : drag horizontal (inchangé)
    const rail = document.querySelector(".testi__rail");
    if (rail) {
      const wrap = rail.parentElement;
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let pointerId = null;
      rail.addEventListener("pointerdown", (e) => {
        isDown = true;
        pointerId = e.pointerId;
        rail.setPointerCapture(pointerId);
        startX = e.pageX;
        scrollLeft = wrap.scrollLeft;
        rail.classList.add("is-dragging");
      });
      rail.addEventListener("pointermove", (e) => {
        if (!isDown) return;
        const dx = e.pageX - startX;
        wrap.scrollLeft = scrollLeft - dx;
      });
      const end = () => { isDown = false; rail.classList.remove("is-dragging"); };
      rail.addEventListener("pointerup", end);
      rail.addEventListener("pointercancel", end);

      const prev = document.querySelector(".testi__nav [data-dir=prev]");
      const next = document.querySelector(".testi__nav [data-dir=next]");
      const card = () => rail.querySelector(".testi__card");
      const step = () => {
        const c = card();
        if (!c) return 320;
        return c.getBoundingClientRect().width + 24;
      };
      if (prev) prev.addEventListener("click", () => { wrap.scrollBy({ left: -step(), behavior: "smooth" }); });
      if (next) next.addEventListener("click", () => { wrap.scrollBy({ left:  step(), behavior: "smooth" }); });
    }
    scrubText(document.querySelector(".cta"), ".cta__title-word");
  }

  // Animations GSAP spécifiques landing (hero words, float cards)
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.gsap && !reduced) {
    const gsap = window.gsap;
    const words = document.querySelectorAll("[data-anim=word]");
    gsap.from(words, {
      yPercent: 100, opacity: 0, duration: 0.8,
      ease: "power3.out", stagger: 0.06, delay: 0.2
    });
    gsap.from("[data-anim=sub]", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.7 });
    gsap.from("[data-anim=cta]", { y: 12, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.85 });
    gsap.from("[data-anim=float-sales]",      { x: -40, y: 20, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.0 });
    gsap.from("[data-anim=float-submission]", { x:  40, y: 20, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.1 });
    gsap.from("[data-anim=float-prop]",       { x:  40, y: 40, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.2 });
    gsap.from("[data-anim=search]", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", delay: 1.3 });

    if (window.ScrollTrigger) {
      const st = window.ScrollTrigger;
      gsap.to(".hero__bg", {
        yPercent: 10, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
      });
      gsap.to(".hero__float--sales", {
        yPercent: -30, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
      });
      gsap.to(".hero__float--submission", {
        yPercent: -20, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
      });
      gsap.to(".hero__float--prop", {
        yPercent: -15, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
      });
      gsap.from(".bento__card", {
        opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)",
        duration: 0.8, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: ".bento", start: "top 80%", once: true }
      });
      gsap.from(".glass-card", {
        opacity: 0, y: 30, duration: 0.7, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: ".testi__grid", start: "top 80%", once: true }
      });
    }
  }
});