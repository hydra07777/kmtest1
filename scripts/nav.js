/* ============================================================
   Keliabe — nav.js
   Gestion du drawer mobile (hamburger → panel coulissant).
   ============================================================ */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".nav__menu-btn");
    const overlay = document.querySelector(".drawer-overlay");
    const drawer = document.querySelector(".drawer");
    const closeBtn = document.querySelector(".drawer__close");

    if (!menuBtn || !overlay || !drawer) return;

    function open() {
      drawer.classList.add("is-open");
      overlay.classList.add("is-open");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("is-open");
      isOpen ? close() : open();
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);

    // Ferme quand on clique sur un lien (utile pour les ancres intra-page)
    drawer.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        // Petit délai pour laisser l'animation de transition démarrer avant la nav
        setTimeout(close, 50);
      });
    });

    // Esc pour fermer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
    });
  });
})();