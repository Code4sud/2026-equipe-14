/* Décors du métier technicien de traitement des eaux. */

const WATER = {
  water: '#5aa0d8',
  waterDeep: '#3f7fb8',
  concrete: '#b9b4c7',
  concreteDark: '#8f8aa3',
  pipe: '#58a6c9',
  pump: '#4c7fb8',
  yellow: '#e6c34a',
  screen: '#1d2233',
};

/* ---------- Bassins à l'extérieur ---------- */

function roundBasin(x, y, rx) {
  return `
    <ellipse cx="${x}" cy="${y + 24}" rx="${rx}" ry="${rx * 0.32}" fill="${WATER.concreteDark}"/>
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.32}" fill="${WATER.concrete}"/>
    <ellipse cx="${x}" cy="${y}" rx="${rx - 22}" ry="${rx * 0.32 - 10}" fill="${WATER.water}"/>
    <rect x="${x - rx + 30}" y="${y - 6}" width="${(rx - 30) * 2}" height="12" fill="${WATER.yellow}"/>
    <circle cx="${x}" cy="${y}" r="16" fill="${WATER.concreteDark}"/>`;
}

function treatmentPlant() {
  return `
    <rect width="1600" height="900" fill="url(#sky)"/>
    ${[[0, 380, 300], [260, 340, 220], [1240, 360, 360]].map(([x, top, w]) => `<rect class="city" x="${x}" y="${top}" width="${w}" height="${520 - top}"/>`).join('')}
    <rect y="500" width="1600" height="400" fill="#7fa86a"/>
    <rect class="floor" y="560" width="1600" height="340"/>
    <rect x="1160" y="300" width="300" height="240" fill="${WATER.concrete}"/>
    <rect x="1180" y="340" width="80" height="60" fill="#8fb8d8"/>
    <rect x="1300" y="340" width="80" height="60" fill="#8fb8d8"/>
    <rect x="1240" y="440" width="70" height="100" fill="${WATER.concreteDark}"/>
    ${roundBasin(520, 640, 300)}
    ${roundBasin(1060, 700, 220)}
    <rect x="80" y="760" width="1440" height="26" rx="12" fill="${WATER.pipe}"/>
    ${[200, 760, 1340].map(x => `<rect x="${x}" y="740" width="40" height="66" rx="8" fill="${WATER.pump}"/>`).join('')}`;
}

/* ---------- Salle de supervision ---------- */

function synoptic() {
  return `
    <rect x="520" y="90" width="760" height="320" rx="14" fill="#2b2f3f"/>
    <rect x="536" y="106" width="728" height="288" rx="6" fill="${WATER.screen}"/>
    <path d="M580 250 H760 V180 H960 V300 H1180" stroke="${WATER.pipe}" stroke-width="14" fill="none"/>
    ${[[600, 250, '#5aa77f'], [760, 180, '#5aa77f'], [960, 300, '#e6a14f'], [1160, 300, '#d8333a']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="20" fill="${c}"/>`).join('')}
    <rect x="580" y="330" width="260" height="26" rx="6" fill="#3a3346"/>
    <rect x="580" y="330" width="190" height="26" rx="6" fill="#5aa77f"/>
    <rect x="880" y="330" width="120" height="26" rx="6" fill="#e6a14f"/>`;
}

function controlRoom() {
  return officeRoom() + synoptic() + desk(380) + desk(900) +
    monitor(560, 420) + monitor(1080, 420) + seatedPerson(700, 3);
}

/* ---------- Salle des pompes ---------- */

function pump(x) {
  return `
    <rect x="${x - 70}" y="560" width="140" height="140" rx="20" fill="${WATER.pump}"/>
    <rect x="${x - 50}" y="470" width="100" height="100" rx="14" fill="#3a5f8f"/>
    <circle cx="${x}" cy="630" r="34" fill="#2b4a73"/>
    <rect x="${x - 90}" y="700" width="180" height="24" fill="${WATER.concreteDark}"/>`;
}

function pumpRoom() {
  return `
    <rect class="wall-low" width="1600" height="740"/>
    <rect class="floor" y="740" width="1600" height="160"/>
    ${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 100}" y1="740" x2="${i * 100}" y2="900" stroke="var(--sc-floor-line)" stroke-width="6"/>`).join('')}
    <rect y="380" width="1600" height="40" fill="${WATER.pipe}"/>
    <rect y="200" width="1600" height="30" fill="#8fb8d8"/>
    ${[420, 800, 1180].map(x => `<rect x="${x - 16}" y="420" width="32" height="60" fill="${WATER.pipe}"/>${pump(x)}`).join('')}
    ${[300, 980].map(x => `<circle cx="${x}" cy="300" r="40" fill="#f4f2f8" stroke="#4a4f63" stroke-width="10"/><path d="M${x} 300 L${x + 26} 280" stroke="#d8333a" stroke-width="8"/>`).join('')}
    <rect x="1360" y="520" width="160" height="200" rx="10" fill="${WATER.yellow}"/>
    <rect x="1380" y="540" width="120" height="70" rx="6" fill="#2b2f3f"/>`;
}

/* ---------- Laboratoire d'analyse ---------- */

function waterLab() {
  const tubes = ['#8fd3ec', '#a8d98a', '#d9c36a', '#8fd3ec', '#c98e66', '#8fd3ec'];
  return `
    <rect class="wall" width="1600" height="560"/>
    <rect class="wood-dark" y="600" width="1600" height="300"/>
    <rect class="wood" y="560" width="1600" height="44"/>
    <rect class="metal" x="600" y="470" width="380" height="16" rx="6"/>
    ${tubes.map((color, i) => `
      <rect x="${626 + i * 58}" y="330" width="34" height="150" rx="16" fill="#f4f2f8" opacity=".9"/>
      <rect x="${626 + i * 58}" y="400" width="34" height="80" rx="14" fill="${color}"/>`).join('')}
    <path d="M1080 560 L1120 400 H1200 L1240 560 Z" fill="#f4f2f8" opacity=".85"/>
    <path d="M1096 560 L1116 480 H1204 L1224 560 Z" fill="#a8d98a"/>
    <rect x="1300" y="440" width="140" height="120" rx="12" fill="#4a4f63"/>
    <rect x="1316" y="456" width="108" height="50" rx="6" fill="#10261c"/>
    <rect x="1330" y="472" width="60" height="18" rx="4" fill="#5ff29a"/>
    <path d="M1440 500 C1480 480 1500 520 1460 560" stroke="#4a4f63" stroke-width="8" fill="none"/>`;
}

/* ---------- Cuve ---------- */

function tank() {
  return `
    <rect class="wall-low" width="1600" height="900"/>
    <ellipse cx="800" cy="520" rx="640" ry="300" fill="${WATER.concreteDark}"/>
    <ellipse cx="800" cy="500" rx="600" ry="270" fill="${WATER.waterDeep}"/>
    <ellipse cx="800" cy="500" rx="520" ry="220" fill="${WATER.water}"/>
    ${[[600, 430], [980, 560], [760, 610]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="90" ry="14" fill="#fff" opacity=".25"/>`).join('')}
    <path d="M940 470 l70 -20 l30 40 l-70 24 Z" fill="#e58aa0"/>
    <rect x="1040" y="170" width="16" height="360" fill="#d9b54a" transform="rotate(28 1048 350)"/>
    ${Array.from({ length: 13 }, (_, i) => `<rect x="${160 + i * 100}" y="780" width="12" height="120" fill="${WATER.yellow}"/>`).join('')}
    <rect y="780" width="1600" height="14" fill="${WATER.yellow}"/>`;
}

/* ---------- Scènes ---------- */

Object.assign(SCENES, {
  station: () => treatmentPlant(),
  controle: () => controlRoom(),
  pompes: () => pumpRoom(),
  analyse: () => waterLab(),
  cuve: () => tank(),
});
