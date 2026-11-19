# Agora Explorer — Équipe 14, Hackathon Azuréen #3

Projet réalisé à Nice les 18, 19 et 20 novembre 2026, sur le thème **« L'orientation et l'employabilité grâce à l'IA »**, organisé par [Code4Sud](https://code4sud.fr).

## Le projet

Les jeunes choisissent souvent une orientation sans avoir vu un métier de l'intérieur. **Agora Explorer** les met en situation : après une courte fiche sur le métier (missions, qualités, formation, conditions de travail), on joue une partie où chaque décision change la suite. À la fin, un collègue virtuel répond aux questions sur le métier. Pour les 16-25 ans qui cherchent leur voie.

- Deux métiers jouables : **barman** (une soirée au bar, 16 scènes) et **chef de projet systèmes embarqués** (une journée pour créer un robot de cuisine, 8 étapes et 4 jauges : client, équipe, budget, délai).
- 2 ou 3 choix par scène (souris ou touches **1**, **2**, **3**), organisés en arbre de décision ; l'état du jeu évolue selon les choix et décide de la fin.
- Tout tourne dans le navigateur : pas de compte, aucune donnée envoyée.
- Jeu en style rétro pixel art (décors SVG pixelisés automatiquement), mode clair et mode sombre.

## Organisation du code

```
index.html            structure des écrans (accueil, choix du métier, jeu, fin)
css/style.css         style commun ; couleurs des thèmes clair et sombre en variables
js/theme.js           mode clair / sombre, mémorisé dans le navigateur
js/dom.js             petits utilitaires partagés
js/illustrations.js   moteur des décors : SVG pixelisé, personnages
js/scenes/*.js        décors de chaque métier (bar, bureau d'études)
js/jobs/*.js          contenu de chaque métier : fiche, scènes, choix, fins, réponses du collègue
js/game.js            moteur du jeu : état, choix, affichage, fin de partie
js/chat.js            chat avec le collègue virtuel
js/audio.js           musique en boucle sans blanc, effets sonores, bouton Son
js/app.js             navigation, recherche, clavier
assets/               musiques (m4a), effets sonores (sons/), logos
tools/                prepare-music.py : prépare une nouvelle musique en boucle (macOS)
```

Ajouter un métier : créer `js/jobs/<metier>.js` sur le modèle de `barman.js` (et ses décors dans `js/scenes/`), charger les fichiers dans `index.html`, l'ajouter à `JOBS` et à son secteur dans `SECTORS` (`js/app.js`), puis à la liste testée dans `tests/jobs.test.js`.

Vérifier le contenu des métiers (liens entre scènes, effets, fins, réponses du chat) :

```bash
node tests/jobs.test.js
```

## Lancer le projet

```bash
# Rien à installer : ouvrir index.html dans un navigateur, ou servir le dossier
python3 -m http.server 8000   # puis http://localhost:8000
```

## Publier sur le site du hackathon

1. Complétez `projet.json` (nom, pitch, description, écoles, technologies, liens).
2. Ajoutez vos captures dans `captures/` et listez-les dans `projet.json`.
3. Poussez sur `main` : votre fiche apparaît sur https://orientation.code4sud.fr/projets/equipe-14 en moins d'une minute.

Toute la doc : https://orientation.code4sud.fr/doc/

## Démo en ligne

Si votre projet est un site sans serveur, il est publié automatiquement sur GitHub Pages à chaque push :
`https://code4sud.github.io/2026-equipe-14/`. Reportez cette adresse dans le champ `demo` de `projet.json`.

## Licence

MIT — voir `LICENSE`.
