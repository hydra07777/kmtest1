# Keliabe

Maquette front-end d'une plateforme de réservation touristique RDC (Kinshasa en priorité).

## Stack

- HTML5 / CSS3 custom (tokens, pas de framework)
- JavaScript vanilla
- GSAP 3.12 + ScrollTrigger via CDN
- Pas de backend : données mockées dans `scripts/data.js`

## Lancer

```bash
# Depuis le dossier keliabe/
npx http-server -p 4173 -s
# Ouvrir http://127.0.0.1:4173/pages/index.html
```

## Vérifier

```bash
# Lance Playwright : captures desktop+mobile, parcours complet, détection défauts
node verify.mjs
```

Le rapport affiche :
- Erreurs console (cible : 0)
- Ressources manquantes (cible : 0)
- Overflow horizontal (cible : 0)
- Cibles tactiles < 44px (rapport informatif)
- Parcours landing → search → listing → booking → confirmation
- Captures dans `shots/`

## Structure

```
keliabe/
├── pages/          # 5 pages HTML
│   ├── index.html      Landing (cœur du livrable)
│   ├── search.html     Résultats + filtres
│   ├── listing.html    Fiche d'un lieu
│   ├── booking.html    Réservation + paiement
│   └── confirmation.html  Confirmation
├── scripts/
│   ├── data.js         Module données (window.KE_DATA)
│   ├── motion.js       Utilitaires GSAP (window.KE_MOTION)
│   └── landing.js      Init spécifique landing
├── styles/
│   ├── tokens.css      Variables CSS (palette, typo, rayons, ombres)
│   ├── base.css        Reset, typo, layout
│   ├── components.css  Boutons, inputs, badges, cartes
│   └── landing.css     Styles spécifiques landing
├── SPEC.md           Spec commune (front, classes, règles)
├── verify.mjs        Script Playwright de vérification
└── index.html        Redirection vers pages/index.html
```

## Choix de design (1 phrase chacun)

- **Palette RDC** — Rouge drapeau + ocre latéritique + bleu fleuve + sève tropicale sur ivoire chaud, ancre le produit localement.
- **Typo Fraunces + Inter** — Serif display éditorial pour la chaleur humaine, sans géométrique pour la clarté UI.
- **Composition signature** — Photo plein écran + colonne latérale de 5 blocs empilés, inspirée du brief visuel initial.
- **Animations** — Easings forts (`power3.out`, `power2.out`), jamais `ease-in`, `scale(0.95)` minimum, `prefers-reduced-motion` respecté.
- **Cartes Bento Phares** — Grille asymétrique 6 col pour éviter le catalogue uniforme de templates.
- **Système de tokens** — Aucune couleur en dur dans le code, tout passe par `--sang`, `--fleuve`, etc.

## Ce qui reste à faire (hors maquette)

- Authentification réelle (login/signup)
- Backend + base de données
- Paiement Airtel Money / M-Pesa réel (intégration API)
- Géolocalisation et carte interactive
- Notifications SMS
- App mobile native