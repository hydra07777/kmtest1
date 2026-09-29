/* ============================================================
   Keliabe — motion.js
   Utilitaires GSAP + ScrollTrigger.
   Court-circuite proprement si GSAP absent ou prefers-reduced-motion.
   ============================================================ */

window.KE_MOTION = window.KE_MOTION || (() => {
  const hasGSAP = () => typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initNavScroll(navEl) {
    if (!navEl) return;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      navEl.classList.toggle("is-scrolled", y > 8);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function heroIntro(rootEl) {
    if (!rootEl) return;
    if (!hasGSAP() || reduced()) {
      // S'assurer que tout est visible
      rootEl.querySelectorAll("[data-anim]").forEach(el => {
        el.style.opacity = 1;
        el.style.transform = "none";
        el.style.clipPath = "none";
      });
      return;
    }
    const gsap = window.gsap;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(rootEl.querySelector("[data-anim=eyebrow]"), {
      y: 14, opacity: 0, duration: 0.6
    });

    const words = rootEl.querySelectorAll("[data-anim=title-word]");
    tl.from(words, {
      yPercent: 110,
      opacity: 0,
      duration: 0.9,
      stagger: 0.06
    }, "-=0.3");

    tl.from(rootEl.querySelector("[data-anim=sub]"), {
      y: 12, opacity: 0, duration: 0.7
    }, "-=0.5");

    tl.from(rootEl.querySelector("[data-anim=search]"), {
      y: 28, opacity: 0, duration: 0.8
    }, "-=0.5");

    tl.from(rootEl.querySelector("[data-anim=meta]"), {
      y: 12, opacity: 0, duration: 0.6
    }, "-=0.5");

    tl.from(rootEl.querySelector("[data-anim=visual]"), {
      opacity: 0, scale: 0.96, rotateY: -6, duration: 1.0
    }, 0.2);

    tl.from(rootEl.querySelectorAll("[data-anim=stack-item]"), {
      x: 40, opacity: 0, duration: 0.7, stagger: 0.08
    }, "-=0.6");
  }

  function heroParallax(visualEl) {
    if (!visualEl) return;
    if (!hasGSAP() || reduced()) return;
    const gsap = window.gsap;
    const st = window.ScrollTrigger;
    gsap.to(visualEl, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: visualEl,
        start: "top top",
        end: "bottom top",
        scrub: 0.5
      }
    });
  }

  function staggerReveal(rootEl, selector, options = {}) {
    if (!rootEl) return;
    const els = rootEl.querySelectorAll(selector);
    if (!els.length) return;

    if (!hasGSAP() || reduced()) {
      els.forEach(el => {
        el.style.opacity = 1;
        el.style.transform = "none";
        el.style.clipPath = "none";
      });
      return;
    }
    const gsap = window.gsap;
    const st = window.ScrollTrigger;

    const fromVars = Object.assign({
      opacity: 0,
      clipPath: "inset(0 0 100% 0)",
      y: 16
    }, options.from || {});

    gsap.from(els, {
      ...fromVars,
      duration: 0.8,
      ease: "power2.out",
      stagger: options.stagger ?? 0.08,
      scrollTrigger: {
        trigger: rootEl,
        start: options.start || "top 80%",
        once: true
      }
    });
  }

  function scrubText(rootEl, selector) {
    if (!rootEl) return;
    if (!hasGSAP() || reduced()) return;
    const gsap = window.gsap;
    const st = window.ScrollTrigger;
    const els = rootEl.querySelectorAll(selector);
    if (!els.length) return;
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0.2, y: 20 },
        {
          opacity: 1, y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6
          }
        }
      );
    });
  }

  function parallaxY(els, amount = -40) {
    if (!els || !els.length) return;
    if (!hasGSAP() || reduced()) return;
    const gsap = window.gsap;
    const st = window.ScrollTrigger;
    els.forEach(el => {
      gsap.to(el, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      });
    });
  }

  return { initNavScroll, heroIntro, heroParallax, staggerReveal, scrubText, parallaxY };
})();