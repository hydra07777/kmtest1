// Keliabe — data.js (module ES)
// Données mockées : quartiers, catégories, phares, témoignages, proof points.

export const quartiers = [
  { id: "gombe",      name: "Gombe",       x: 0.46, y: 0.62 },
  { id: "bandal",     name: "Bandal",      x: 0.40, y: 0.55 },
  { id: "lingwala",   name: "Lingwala",    x: 0.50, y: 0.50 },
  { id: "limete",     name: "Limete",      x: 0.62, y: 0.55 },
  { id: "kintambo",   name: "Kintambo",    x: 0.30, y: 0.42 },
  { id: "ngaliema",   name: "Ngaliema",    x: 0.20, y: 0.58 },
  { id: "lemba",      name: "Lemba",       x: 0.58, y: 0.42 },
  { id: "kimbanseke", name: "Kimbanseke",  x: 0.78, y: 0.55 }
];

export const categories = [
  { id: "hotel",      name: "Hôtels",       count: 184, accent: "var(--fleuve)" },
  { id: "restaurant", name: "Restaurants",  count: 326, accent: "var(--sang)" },
  { id: "cafe",       name: "Cafés",        count: 97,  accent: "var(--ocre)" },
  { id: "experience", name: "Expériences",  count: 58,  accent: "var(--seve)" },
  { id: "evenement",  name: "Événements",   count: 42,  accent: "var(--ink)" }
];

export const phares = [
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
    gradient: ["#0E1B40", "#1A2750", "#243560"],
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

export const testimonials = [
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

export const proof = [
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

// Image Unsplash par lieu phare, partagée par landing + search + listing
export const pharePhotos = {
  "mama-koko":     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&auto=format&fit=crop",
  "memling":       "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80&auto=format&fit=crop",
  "savon":         "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1600&q=80&auto=format&fit=crop",
  "kin-brasserie": "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=1600&q=80&auto=format&fit=crop",
  "pool-cruise":   "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=1600&q=80&auto=format&fit=crop",
  "marche-central":"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80&auto=format&fit=crop"
};

// Galeries par lieu (pour listing.html)
export const phareGalleries = {
  "mama-koko":    ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop"],
  "memling":      ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&auto=format&fit=crop"],
  "savon":        ["https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop"],
  "kin-brasserie":["https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80&auto=format&fit=crop"],
  "pool-cruise":  ["https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800&q=80&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80&auto=format&fit=crop"],
  "marche-central":["https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80&auto=format&fit=crop"]
};

// Avis vérifiés pour listing.html
export const sampleReviews = [
  { name: "Patience K.", role: "Kinshasa · Voyageuse", initials: "PK", stars: 5,
    text: "Endroit incroyable. Personnel chaleureux, cuisine authentique. Je reviendrai sans hésiter." },
  { name: "Eric M.", role: "Goma · Visiteur", initials: "EM", stars: 5,
    text: "Une expérience mémorable. L'accueil est soigné, les plats sont généreux, l'ambiance est exactement ce qu'on cherche." },
  { name: "Grâce L.", role: "Lubumbashi · Voyageuse", initials: "GL", stars: 4,
    text: "Très bon moment passé ici. Petit bémol sur le temps d'attente, mais la qualité est au rendez-vous." }
];

// Catégories d'images Unsplash pour les cartes search
export const catPhotos = {
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop",
  hotel:      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
  cafe:       "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80&auto=format&fit=crop",
  experience: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=800&q=80&auto=format&fit=crop",
  evenement:  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80&auto=format&fit=crop"
};