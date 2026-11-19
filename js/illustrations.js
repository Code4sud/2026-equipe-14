/* Décors du jeu dessinés en SVG puis affichés en pixel art.
   Les couleurs viennent des variables --sc-* de style.css (thème clair ou sombre). */

const PIXEL_WIDTH = 320;
const PIXEL_HEIGHT = 180;
const COLOR_STEP = 24;

const PALETTE = {
  shirts: ['#6c5ad6', '#e58aa0', '#58a6c9', '#e6a14f', '#5aa77f'],
  skins: ['#f1c7a5', '#c98e66', '#8d5a3b', '#e8b48f', '#a86f4c'],
  hair: ['#2b2230', '#5a3825', '#1f1a24', '#8a5a2e', '#3d2a20'],
  bottles: ['#4f9a6e', '#c8792c', '#c95a78', '#4c7fb8', '#d9b54a'],
};

const sceneStyle = `
  .wall { fill: var(--sc-wall); }
  .wall-low { fill: var(--sc-wall-low); }
  .panel { fill: var(--sc-panel); }
  .wood { fill: var(--sc-wood); }
  .wood-dark { fill: var(--sc-wood-dark); }
  .counter { fill: var(--sc-counter); }
  .counter-top { fill: var(--sc-counter-top); }
  .floor { fill: var(--sc-floor); }
  .floor-line { stroke: var(--sc-floor-line); stroke-width: 4; fill: none; }
  .rail { fill: var(--sc-rail); }
  .metal { fill: var(--sc-metal); }
  .metal-line { stroke: var(--sc-metal); stroke-width: 6; fill: none; }
  .city { fill: var(--sc-city); }
  .city-light { fill: var(--sc-city-light); opacity: var(--sc-city-light-opacity); }
  .lamp { fill: var(--sc-lamp); }
  .glow { fill: url(#glow); opacity: var(--sc-glow-opacity); }
  .glow-stop { stop-color: var(--sc-lamp); }
  .plant { fill: var(--sc-plant); }
  .pot { fill: var(--sc-pot); }
  .glass { fill: var(--sc-glass); stroke: var(--sc-glass-line); stroke-width: 4; }
  .stain { fill: var(--sc-stain); }
  .puddle { fill: var(--sc-puddle); }
  .shine { fill: var(--sc-shine); }
  .board { fill: var(--sc-board); }
  .sky-top { stop-color: var(--sc-sky-top); }
  .sky-bottom { stop-color: var(--sc-sky-bottom); }
`;

function svgScene(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="${PIXEL_WIDTH}" height="${PIXEL_HEIGHT}" shape-rendering="crispEdges">
    <style>${sceneStyle}</style>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="sky-top"/><stop offset="1" class="sky-bottom"/>
      </linearGradient>
      <radialGradient id="glow">
        <stop offset="0" class="glow-stop" stop-opacity="1"/><stop offset="1" class="glow-stop" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="windowGlass"><rect x="136" y="126" width="288" height="268" rx="10"/></clipPath>
      <filter id="blur"><feGaussianBlur stdDeviation="7"/></filter>
      <filter id="blurStrong"><feGaussianBlur stdDeviation="26"/></filter>
    </defs>
    ${content}
  </svg>`;
}

/* ---------- Personnages (vus de dos) ---------- */

function seatedPerson(x, index) {
  const shirt = PALETTE.shirts[index % 5];
  const skin = PALETTE.skins[index % 5];
  const hair = PALETTE.hair[index % 5];
  return `
    <rect x="${x - 38}" y="680" width="30" height="120" rx="14" fill="#3b3550"/>
    <rect x="${x + 8}" y="680" width="30" height="120" rx="14" fill="#3b3550"/>
    <path d="M${x - 60} 700 V560 Q${x - 60} 520 ${x - 20} 516 H${x + 20} Q${x + 60} 520 ${x + 60} 560 V700 Z" fill="${shirt}"/>
    <rect x="${x - 12}" y="488" width="24" height="34" rx="8" fill="${skin}"/>
    <circle cx="${x}" cy="462" r="40" fill="${skin}"/>
    <path d="M${x - 42} 466 Q${x - 44} 418 ${x} 418 Q${x + 44} 418 ${x + 42} 466 Q${x + 30} 494 ${x} 494 Q${x - 30} 494 ${x - 42} 466 Z" fill="${hair}"/>`;
}

function standingPerson(x, index, scale = 1) {
  const shirt = PALETTE.shirts[index % 5];
  const skin = PALETTE.skins[index % 5];
  const hair = PALETTE.hair[index % 5];
  return `<g transform="translate(${x} 860) scale(${scale}) translate(${-x} -860)">
    <rect x="${x - 34}" y="700" width="30" height="160" rx="14" fill="#3b3550"/>
    <rect x="${x + 4}" y="700" width="30" height="160" rx="14" fill="#3b3550"/>
    <path d="M${x - 56} 720 V560 Q${x - 56} 518 ${x - 18} 514 H${x + 18} Q${x + 56} 518 ${x + 56} 560 V720 Z" fill="${shirt}"/>
    <rect x="${x - 11}" y="486" width="22" height="34" rx="8" fill="${skin}"/>
    <circle cx="${x}" cy="460" r="37" fill="${skin}"/>
    <path d="M${x - 39} 464 Q${x - 41} 420 ${x} 420 Q${x + 41} 420 ${x + 39} 464 Q${x + 28} 490 ${x} 490 Q${x - 28} 490 ${x - 39} 464 Z" fill="${hair}"/>
  </g>`;
}

function frontPerson(x, baseY, index, sick = false) {
  const shirt = PALETTE.shirts[index % 5];
  const skin = PALETTE.skins[index % 5];
  const hair = PALETTE.hair[index % 5];
  const headY = baseY - 250;
  return `
    <path d="M${x - 80} ${baseY} V${baseY - 150} Q${x - 80} ${baseY - 196} ${x - 34} ${baseY - 200} H${x + 34} Q${x + 80} ${baseY - 196} ${x + 80} ${baseY - 150} V${baseY} Z" fill="${shirt}"/>
    <rect x="${x - 14}" y="${headY + 34}" width="28" height="34" rx="8" fill="${skin}"/>
    <circle cx="${x}" cy="${headY}" r="48" fill="${skin}"/>
    <path d="M${x - 50} ${headY - 4} Q${x - 50} ${headY - 56} ${x} ${headY - 56} Q${x + 50} ${headY - 56} ${x + 50} ${headY - 4} Q${x + 30} ${headY - 30} ${x} ${headY - 30} Q${x - 30} ${headY - 30} ${x - 50} ${headY - 4} Z" fill="${hair}"/>
    <rect x="${x - 22}" y="${headY - 4}" width="10" height="12" rx="3" fill="#2b2230"/>
    <rect x="${x + 12}" y="${headY - 4}" width="10" height="12" rx="3" fill="#2b2230"/>
    <path d="M${x - 14} ${headY + 26} Q${x} ${sick ? headY + 18 : headY + 34} ${x + 14} ${headY + 26}" stroke="#2b2230" stroke-width="5" fill="none"/>
    ${sick ? `<circle cx="${x}" cy="${headY + 12}" r="7" fill="#d8575f"/>` : ''}`;
}

/* ---------- Scènes (remplies par js/scenes/*.js) ---------- */

const SCENES = {};

function drawScene(name) {
  return svgScene((SCENES[name] || Object.values(SCENES)[0])());
}

/* ---------- Rendu pixel art ---------- */

function withThemeColors(svg) {
  const styles = getComputedStyle(document.documentElement);
  return svg.replace(/var\((--sc-[\w-]+)\)/g, (_, name) => styles.getPropertyValue(name).trim());
}

function posterize(context) {
  const image = context.getImageData(0, 0, PIXEL_WIDTH, PIXEL_HEIGHT);
  const pixels = image.data;
  for (let i = 0; i < pixels.length; i += 4) {
    for (let channel = 0; channel < 3; channel++) {
      pixels[i + channel] = Math.min(255, Math.round(pixels[i + channel] / COLOR_STEP) * COLOR_STEP);
    }
  }
  context.putImageData(image, 0, 0);
}

const paintedScenes = new Map();

function sceneCanvas(name) {
  const key = `${document.documentElement.dataset.theme}:${name}`;
  if (!paintedScenes.has(key)) paintedScenes.set(key, paint(name));
  return paintedScenes.get(key);
}

async function paint(name) {
  const image = new Image();
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(withThemeColors(drawScene(name)));
  await image.decode();

  const canvas = document.createElement('canvas');
  canvas.width = PIXEL_WIDTH;
  canvas.height = PIXEL_HEIGHT;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, PIXEL_WIDTH, PIXEL_HEIGHT);
  posterize(context);
  return canvas;
}
