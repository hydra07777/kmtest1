# SPEC — Keliabe

Plateforme de réservation touristique RDC (cible : Kinshasa en priorité).

## Direction artistique

- **Palette RDC** (tokens uniquement, jamais de couleurs en dur dans le code) :
  - `--ink` #0E0E10 (encre profonde)
  - `--paper` #FAF7F2 (ivoire chaud, pas blanc cru)
  - `--sang` #C8102E (rouge drapeau, CTA primaire)
  - `--fleuve` #1E5A8A (bleu Congo, liens/secondaire)
  - `--ocre` #C97B3C (terre latéritique, accents)
  - `--seve` #2E8B57 (sève tropicale, succès)

- **Typo** : Fraunces (display serif) + Inter (corps) + JetBrains Mono (données).

- **Composition signature** (inspirée du screenshot) :
  photo plein écran à gauche (hero/asymétrique), colonne latérale droite de
  blocs empilés (catégories, filtres, navigation verticale).

## Stack

- HTML5 / CSS3 custom / JS vanilla
- GSAP 3.12 + ScrollTrigger via CDN
- Données mockées via `window.KE_DATA` (cf. skill static-mockup-pipeline :
  pas de `const` lexical partagé entre scripts)

## Pages livrées

1. `pages/index.html` — Landing (cœur du livrable)
2. `pages/search.html` — Résultats + filtres
3. `pages/listing.html` — Fiche détaillée d'un lieu
4. `pages/booking.html` — Processus de réservation
5. `pages/confirmation.html` — Confirmation

`index.html` à la racine redirige vers `pages/index.html`.

## Règles transversales

- Un seul `<h1>` par page.
- Toutes les couleurs viennent des tokens CSS.
- Pas d'emoji fonctionnel.
- Animations courtes-circuitent si `!window.gsap`.
- `prefers-reduced-motion` : fade200ms sans mouvement.
- Hover gated par `@media (hover: hover) and (pointer: fine)`.
- Mobile-first : tester 375px / 768px / 1280px.

## Animations (Emil Kowalski)

- Entrées : `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out fort).
- Mouvement sur écran : `cubic-bezier(0.77, 0, 0.175, 1)`.
- Jamais `ease-in` sur UI.
- Durées : hover 200ms, reveal 600-800ms, scrub 0.3-0.6.
- Jamais `scale(0)` : partir de `scale(0.95)` + opacity.
- `transition: all` interdit : préciser les propriétés.
- `transform-origin` correct (jamais center sauf modales).

## Vérification

Script Playwright unique `verify.mjs` qui, pour chaque page :
1. console errors / pageerror (zéro toléré)
2. ressources ≥ 400 ou locales non résolues (zéro)
3. scrollWidth > clientWidth + 1 à 375px (zéro)
4. cibles tactiles < 44px (zéro)
5. parcours landing → recherche → fiche → réservation → confirm
6. animations ont atteint leur état final
7. captures desktop ET mobile