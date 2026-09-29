/* ============================================================
   Keliabe — landing.js
   Initialisation de la page landing.
   ============================================================ */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const KE_MOTION = window.KE_MOTION;
    if (!KE_MOTION) return;

    KE_MOTION.initNavScroll(document.querySelector(".nav"));

    // Hero intro + parallax
    const hero = document.querySelector(".hero");
    if (hero) {
      KE_MOTION.heroIntro(hero);
      KE_MOTION.heroParallax(document.querySelector(".hero__visual"));
    }

    // Section "Pourquoi" : stagger
    KE_MOTION.staggerReveal(document.querySelector(".why"), ".why__card", { stagger: 0.1 });

    // Section Catégories : stagger + parallax
    const cats = document.querySelector(".categories");
    if (cats) {
      KE_MOTION.staggerReveal(cats, ".cat-tile", { stagger: 0.08 });
      KE_MOTION.parallaxY(cats.querySelectorAll(".cat-tile__bg"), -12);
    }

    // Section Phares : Bento reveal + parallax
    const phares = document.querySelector(".phares");
    if (phares) {
      KE_MOTION.staggerReveal(phares, ".phares__card", { stagger: 0.1 });
      KE_MOTION.parallaxY(phares.querySelectorAll(".phares__card"), -20);
    }

    // Section Témoignages : rail drag horizontal
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
      const end = () => {
        isDown = false;
        rail.classList.remove("is-dragging");
      };
      rail.addEventListener("pointerup", end);
      rail.addEventListener("pointercancel", end);

      // Boutons
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

    // CTA scrub
    KE_MOTION.scrubText(document.querySelector(".cta"), ".cta__title-word");
  });
})();