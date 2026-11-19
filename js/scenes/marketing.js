/* Décors du métier chargé de marketing. */

const MARKET = {
  phone: '#2b2230',
  screenTop: '#6c5ad6',
  screenBottom: '#58a6c9',
  card: '#f4f2f8',
  like: '#e58aa0',
  poster: '#f2c23a',
};

function phoneShape(x, y, w, h, content = '') {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.14}" fill="${MARKET.phone}"/>
    <rect x="${x + w * 0.06}" y="${y + w * 0.06}" width="${w * 0.88}" height="${h - w * 0.12}" rx="${w * 0.1}" fill="${MARKET.screenTop}"/>
    <rect x="${x + w * 0.06}" y="${y + h * 0.5}" width="${w * 0.88}" height="${h * 0.5 - w * 0.06}" rx="${w * 0.1}" fill="${MARKET.screenBottom}"/>
    <rect x="${x + w * 0.4}" y="${y + w * 0.1}" width="${w * 0.2}" height="${w * 0.05}" rx="${w * 0.025}" fill="${MARKET.phone}"/>
    ${content}`;
}

/* ---------- Le téléphone en vitrine ---------- */

function productShot() {
  const sparkles = [[560, 220], [1080, 180], [1140, 520], [500, 560]].map(([x, y]) =>
    `<path d="M${x} ${y - 30} L${x + 8} ${y - 8} L${x + 30} ${y} L${x + 8} ${y + 8} L${x} ${y + 30} L${x - 8} ${y + 8} L${x - 30} ${y} L${x - 8} ${y - 8} Z" fill="#ffe7a8"/>`).join('');
  return `
    <rect class="panel" width="1600" height="900"/>
    <circle class="glow" cx="800" cy="360" r="420"/>
    <ellipse cx="800" cy="720" rx="360" ry="60" fill="var(--sc-wood-dark)"/>
    <rect x="460" y="660" width="680" height="60" fill="var(--sc-wood)"/>
    ${phoneShape(680, 120, 240, 520)}
    <rect x="720" y="420" width="160" height="40" rx="20" fill="#fff" opacity=".7"/>
    <rect x="740" y="480" width="120" height="20" rx="10" fill="#fff" opacity=".5"/>
    ${sparkles}`;
}

/* ---------- Réseaux sociaux ---------- */

function socialFeed() {
  const posts = [[0, true], [1, false], [2, true]];
  return `
    <rect class="wall" width="1600" height="900"/>
    ${phoneShape(560, 40, 480, 820, posts.map(([i, liked]) => `
      <rect x="610" y="${150 + i * 220}" width="380" height="190" rx="18" fill="${MARKET.card}"/>
      <circle cx="660" cy="${195 + i * 220}" r="26" fill="${PALETTE.shirts[i]}"/>
      <rect x="700" y="${182 + i * 220}" width="200" height="14" rx="7" fill="#a9a5c0"/>
      <rect x="640" y="${240 + i * 220}" width="300" height="12" rx="6" fill="#c9c6dc"/>
      <rect x="640" y="${262 + i * 220}" width="220" height="12" rx="6" fill="#c9c6dc"/>
      ${liked
        ? `<path d="M930 ${306 + i * 220} c-10 -14 -34 -8 -30 10 c2 10 30 26 30 26 c0 0 28 -16 30 -26 c4 -18 -20 -24 -30 -10 Z" fill="${MARKET.like}"/>`
        : `<path d="M900 ${290 + i * 220} h44 l-8 34 h-36 Z" fill="#8a86a3"/><rect x="888" y="${290 + i * 220}" width="12" height="34" fill="#8a86a3"/>`}`).join(''))}
    ${[[400, 300], [1200, 420], [360, 640]].map(([x, y]) => `<path d="M${x} ${y} c-14 -20 -48 -12 -42 14 c3 14 42 36 42 36 c0 0 39 -22 42 -36 c6 -26 -28 -34 -42 -14 Z" fill="${MARKET.like}" opacity=".8"/>`).join('')}
    <rect x="1180" y="620" width="160" height="90" rx="20" fill="${MARKET.card}"/>
    <path d="M1210 710 l-10 40 l40 -40 Z" fill="${MARKET.card}"/>`;
}

/* ---------- Deux campagnes ---------- */

function posters() {
  return `
    <rect width="1600" height="900" fill="url(#sky)"/>
    ${[[0, 420, 260], [1340, 380, 260]].map(([x, top, w]) => `<rect class="city" x="${x}" y="${top}" width="${w}" height="${900 - top}"/>`).join('')}
    <rect class="wall-low" x="200" y="120" width="1200" height="560" rx="10"/>
    <rect x="260" y="170" width="500" height="460" fill="${MARKET.poster}"/>
    ${phoneShape(420, 220, 160, 330)}
    <rect x="300" y="580" width="420" height="30" rx="8" fill="${MARKET.phone}"/>
    <rect x="840" y="170" width="500" height="460" fill="#58a6c9"/>
    <circle cx="1090" cy="360" r="130" fill="#fff" opacity=".85"/>
    ${phoneShape(1040, 260, 100, 200)}
    <rect x="880" y="580" width="420" height="30" rx="8" fill="#fff"/>
    <rect class="floor" y="680" width="1600" height="220"/>
    <rect x="740" y="680" width="120" height="200" fill="var(--sc-metal)"/>`;
}

/* ---------- Boutique ---------- */

function store() {
  const boxes = Array.from({ length: 8 }, (_, i) => `
    <rect x="${300 + (i % 4) * 140}" y="${240 + Math.floor(i / 4) * 150}" width="100" height="120" rx="8" fill="${MARKET.card}"/>
    ${phoneShape(325 + (i % 4) * 140, 255 + Math.floor(i / 4) * 150, 50, 90)}`).join('');
  return `
    <rect class="wall" width="1600" height="620"/>
    <rect class="floor" y="620" width="1600" height="280"/>
    <rect class="wood-dark" x="260" y="200" width="620" height="20"/>
    <rect class="wood-dark" x="260" y="350" width="620" height="20"/>
    <rect class="wood-dark" x="260" y="500" width="620" height="20"/>
    ${boxes}
    <rect x="1000" y="140" width="420" height="260" rx="12" fill="${MARKET.poster}"/>
    ${phoneShape(1150, 170, 110, 200)}
    <rect class="wood" x="940" y="540" width="560" height="40" rx="10"/>
    <rect class="wood-dark" x="960" y="580" width="520" height="140"/>
    ${standingPerson(700, 1, 0.9)}${standingPerson(1260, 3, 0.85)}`;
}

/* ---------- Scènes ---------- */

Object.assign(SCENES, {
  smartphone: () => productShot(),
  reseaux: () => socialFeed(),
  affiche: () => posters(),
  magasin: () => store(),
});
