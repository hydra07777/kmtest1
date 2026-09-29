/* ============================================================
   Keliabe — data.js
   Module données exposé via window.KE_DATA.
   Pas de const lexical partagé entre scripts.
   ============================================================ */

window.KE_DATA = window.KE_DATA || (() => {
  const quartiers = [
    { id: "gombe",   name: "Gombe",      x: 0.46, y: 0.62 },
    { id: "bandal",  name: "Bandal",     x: 0.40, y: 0.55 },
    { id: "lingwala",name: "Lingwala",   x: 0.50, y: 0.50 },
    { id: "limete",  name: "Limete",     x: 0.62, y: 0.55 },
    { id: "kintambo",name: "Kintambo",   x: 0.30, y: 0.42 },
    { id: "ngaliema",name: "Ngaliema",   x: 0.20, y: 0.58 },
    { id: "lemba",   name: "Lemba",      x: 0.58, y: 0.42 },
    { id: "kimbanseke", name: "Kimbanseke", x: 0.78, y: 0.55 }
  ];

  const categories = [
    { id: "hotel",      name: "Hôtels",      count: 184, accent: "var(--fleuve)" },
    { id: "restaurant", name: "Restaurants", count: 326, accent: "var(--sang)" },
    { id: "cafe",       name: "Cafés",       count: 97,  accent: "var(--ocre)" },
    { id: "experience", name: "Expériences", count: 58,  accent: "var(--seve)" },
    { id: "evenement",  name: "Événements",  count: 42,  accent: "var(--ink)" }
  ];

  const phares = [
    {
      id: "mama-koko",
      title: "Mama Koko",
      meta: "Gombe · Restaurant",
      price: 4500,
      tone: "sang",
      gradient: ["#3A0A12", "#8B0A1F", "#C8102E"],
      pattern: "kuba-1"
    },
    {
      id: "memling",
      title: "Hôtel Memling",
      meta: "Gombe · Hôtel",
      price: 18500,
      tone: "ink",
      gradient: ["#0E0E10", "#1A1A1F", "#2A2A30"],
      pattern: "kuba-2"
    },
    {
      id: "savon",
      title: "Savon Café",
      meta: "Bandal · Café",
      price: 2800,
      tone: "ocre",
      gradient: ["#5A3416", "#9E5D26", "#C97B3C"],
      pattern: "kuba-3"
    },
    {
      id: "kin-brasserie",
      title: "Kin Brasserie",
      meta: "Limete · Expérience",
      price: 6200,
      tone: "seve",
      gradient: ["#10331F", "#1F6240", "#2E8B57"],
      pattern: "kuba-1"
    },
    {
      id: "pool-cruise",
      title: "Croisière du Pool",
      meta: "Kintambo · Expérience",
      price: 12000,
      tone: "fleuve",
      gradient: ["#0F2A40", "#143F5E", "#1E5A8A"],
      pattern: "kuba-2"
    },
    {
      id: "marche-central",
      title: "Marché Centrale",
      meta: "Lingwala · Événement",
      price: 0,
      tone: "ocre",
      gradient: ["#2A1A0A", "#5A3416", "#9E5D26"],
      pattern: "kuba-3"
    }
  ];

  const testimonials = [
    {
      quote: "Réserver une table à Gombe un vendredi soir, c'était impossible avant. Avec Keliabe j'avais ma confirmation en deux minutes.",
      name: "Patience K.",
      role: "Kinshasa · Voyageuse",
      initials: "PK"
    },
    {
      quote: "J'héberge mon guesthouse à Bandal depuis six mois. Keliabe m'a apporté 40% de réservations en plus — et en Francs Congolais.",
      name: "Eric M.",
      role: "Hôte · Guesthouse",
      initials: "EM"
    },
    {
      quote: "Le paiement via Airtel est un vrai plus. Mes amis de Lubumbashi ont pu m'offrir un weekend à Kin sans prise de tête.",
      name: "Grâce L.",
      role: "Goma · Cliente",
      initials: "GL"
    },
    {
      quote: "J'ai découvert un café rooftop à Limete que je ne connaissais pas. Maintenant c'est mon spot du dimanche.",
      name: "Christian B.",
      role: "Kinshasa · Membre",
      initials: "CB"
    }
  ];

  const proof = [
    {
      title: "Hôtes vérifiés localement",
      text: "Chaque établissement est validé par notre équipe à Kinshasa. Pas d'annonces fantômes.",
      icon: "shield"
    },
    {
      title: "Paiement en CDF",
      text: "Réglez via Airtel Money, M-Pesa, Orange Money ou carte Visa. Sans frais cachés.",
      icon: "wallet"
    },
    {
      title: "Annulation 24h",
      text: "Changez d'avis gratuitement jusqu'à 24h avant. Politique claire, sans astérisque.",
      icon: "calendar"
    }
  ];

  return { quartiers, categories, phares, testimonials, proof };
})();