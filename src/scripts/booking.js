// booking.js — Logique de la page booking.html (sélection mode de paiement)
document.querySelectorAll(".pay-method").forEach(el => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".pay-method").forEach(x => x.classList.remove("is-active"));
    el.classList.add("is-active");
  });
});