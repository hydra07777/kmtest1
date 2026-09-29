// nav.js — Gestion du drawer mobile (hamburger → panel coulissant)
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

  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => { setTimeout(close, 50); });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
  });
});