/* Décors du métier chauffeur routier. */

const ROAD = {
  cab: '#d8333a',
  cabDark: '#a8262c',
  tank: '#d9dce6',
  tankShade: '#aeb2c2',
  tyre: '#2b2230',
  asphalt: '#4a4f63',
  line: '#f4f2f8',
  display: '#10261c',
};

function tankerTruck(x, baseY, scale = 1) {
  return `<g transform="translate(${x} ${baseY}) scale(${scale})">
    <rect x="-380" y="-250" width="560" height="190" rx="90" fill="${ROAD.tank}"/>
    <rect x="-380" y="-120" width="560" height="40" fill="${ROAD.tankShade}"/>
    ${[-300, -140, 20].map(dx => `<rect x="${dx}" y="-270" width="60" height="26" rx="6" fill="${ROAD.tankShade}"/>`).join('')}
    <rect x="-390" y="-70" width="600" height="24" fill="#3a3346"/>
    <path d="M200 -60 V-230 Q200 -250 220 -250 H300 Q340 -250 360 -200 L380 -140 V-60 Z" fill="${ROAD.cab}"/>
    <path d="M232 -230 H296 Q320 -230 334 -196 L346 -160 H232 Z" fill="#8fb8d8"/>
    <rect x="200" y="-90" width="180" height="30" fill="${ROAD.cabDark}"/>
    ${[-320, -230, 280].map(dx => `<circle cx="${dx}" cy="-40" r="44" fill="${ROAD.tyre}"/><circle cx="${dx}" cy="-40" r="18" fill="#a9a5c0"/>`).join('')}
  </g>`;
}

/* ---------- Dépôt ---------- */

function depot() {
  return `
    <rect width="1600" height="900" fill="url(#sky)"/>
    <rect class="wall-low" x="0" y="200" width="760" height="420"/>
    ${[60, 300, 540].map(x => `<rect x="${x}" y="320" width="180" height="300" fill="#8f8aa3"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${x}" y="${330 + i * 58}" width="180" height="6" fill="#6f6884"/>`).join('')}`).join('')}
    <rect class="floor" y="620" width="1600" height="280"/>
    ${tankerTruck(1080, 760, 1)}
    <rect x="1440" y="420" width="110" height="200" rx="16" fill="#2b2230"/>
    <rect x="1452" y="436" width="86" height="150" rx="8" fill="#58a6c9"/>
    <circle cx="1495" cy="600" r="8" fill="#a9a5c0"/>`;
}

/* ---------- Bascule et poste de garde ---------- */

function weighbridge() {
  return `
    <rect width="1600" height="900" fill="url(#sky)"/>
    <rect class="floor" y="620" width="1600" height="280"/>
    <rect x="160" y="300" width="300" height="320" fill="var(--sc-wall-low)"/>
    <rect x="200" y="360" width="220" height="110" fill="#8fb8d8"/>
    <rect x="240" y="500" width="80" height="120" fill="#6f6884"/>
    <rect x="150" y="270" width="320" height="40" fill="#e6c34a"/>
    <rect x="520" y="560" width="40" height="60" fill="#e6c34a"/>
    <rect x="540" y="580" width="420" height="14" fill="#d8333a"/>
    <rect x="600" y="760" width="900" height="40" fill="#6f6884"/>
    <rect x="600" y="752" width="900" height="10" fill="#e6c34a"/>
    ${tankerTruck(1120, 770, 0.9)}
    <rect x="1440" y="220" width="20" height="400" fill="var(--sc-metal)"/>
    <rect x="1300" y="160" width="290" height="130" rx="12" fill="#2b2f3f"/>
    <rect x="1320" y="180" width="250" height="90" rx="6" fill="${ROAD.display}"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${1340 + i * 56}" y="196" width="40" height="58" rx="4" fill="#5ff29a" opacity=".85"/>`).join('')}`;
}

/* ---------- Quai de chargement ---------- */

function loadingBay() {
  return `
    <rect class="wall-low" width="1600" height="620"/>
    <rect class="floor" y="620" width="1600" height="280"/>
    ${[120, 1300].map(x => `<rect x="${x}" y="120" width="200" height="500" rx="20" fill="#b9b4c7"/><rect x="${x + 20}" y="150" width="160" height="40" fill="#e6c34a"/>`).join('')}
    <rect x="440" y="80" width="760" height="24" fill="var(--sc-metal)"/>
    ${tankerTruck(820, 770, 0.95)}
    <path d="M560 100 V300 Q560 360 620 400 L640 470" stroke="#3a3346" stroke-width="26" fill="none"/>
    <rect x="620" y="460" width="40" height="40" rx="8" fill="#6f6884"/>
    ${[600, 760].map(x => `<rect x="${x}" y="500" width="22" height="22" rx="4" fill="#e6a14f"/>`).join('')}`;
}

/* ---------- Route ---------- */

function highway() {
  return `
    <rect width="1600" height="900" fill="url(#sky)"/>
    <path d="M0 520 Q300 420 600 480 T1200 440 T1600 470 V900 H0 Z" fill="#7fa86a"/>
    <path d="M0 640 H1600 V900 H0 Z" fill="${ROAD.asphalt}"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 200 + 20}" y="760" width="120" height="14" fill="${ROAD.line}"/>`).join('')}
    <rect y="636" width="1600" height="8" fill="${ROAD.line}"/>
    ${tankerTruck(760, 860, 0.8)}
    <rect x="1300" y="320" width="16" height="320" fill="var(--sc-metal)"/>
    <rect x="1180" y="240" width="260" height="140" rx="12" fill="#4c7fb8"/>
    <rect x="1210" y="270" width="80" height="80" rx="8" fill="${ROAD.line}"/>
    <path d="M1230 330 L1250 290 L1270 330 Z" fill="#4c7fb8"/>
    <rect x="1310" y="290" width="100" height="14" rx="6" fill="${ROAD.line}"/>
    <rect x="1310" y="320" width="70" height="14" rx="6" fill="${ROAD.line}"/>`;
}

/* ---------- Station de lavage ---------- */

function washStation() {
  const jets = [520, 760, 1000, 1240].map(x => `<path d="M${x} 180 L${x - 60} 420 M${x} 180 L${x + 60} 420 M${x} 180 V430" stroke="#8fd3ec" stroke-width="10" opacity=".8"/>`).join('');
  return `
    <rect class="wall-low" width="1600" height="900"/>
    <rect x="360" y="120" width="1000" height="60" fill="var(--sc-metal)"/>
    <rect x="360" y="120" width="40" height="560" fill="var(--sc-metal)"/>
    <rect x="1320" y="120" width="40" height="560" fill="var(--sc-metal)"/>
    ${jets}
    <rect class="floor" y="680" width="1600" height="220"/>
    ${tankerTruck(860, 800, 0.9)}
    ${[[420, 500], [1180, 460], [700, 380]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="26" fill="#fff" opacity=".55"/>`).join('')}
    <rect x="80" y="380" width="180" height="230" rx="10" fill="#f4f2f8"/>
    <rect x="104" y="410" width="132" height="10" rx="5" fill="#a9a5c0"/>
    <rect x="104" y="440" width="100" height="10" rx="5" fill="#a9a5c0"/>
    <circle cx="200" cy="550" r="32" fill="#5aa77f"/>`;
}

/* ---------- Scènes ---------- */

Object.assign(SCENES, {
  depot: () => depot(),
  bascule: () => weighbridge(),
  quai: () => loadingBay(),
  route: () => highway(),
  lavage: () => washStation(),
});
