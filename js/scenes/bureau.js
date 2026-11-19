/* Décors du métier chef de projet systèmes embarqués. */

const OFFICE = {
  screen: '#1d2233',
  pcb: '#2f7d4f',
  pcbDark: '#23603d',
  copper: '#d9b54a',
  chip: '#1f1a24',
  device: '#e9e6f2',
  bowl: '#c9cede',
  outline: '#8a86a3',
};

/* ---------- Salle ---------- */

function officeRoom() {
  return `
    <rect class="wall" width="1600" height="620"/>
    <rect class="wall-low" y="560" width="1600" height="60"/>
    <rect class="floor" y="620" width="1600" height="280"/>
    ${[690, 770, 860].map(y => `<line class="floor-line" x1="0" y1="${y}" x2="1600" y2="${y}"/>`).join('')}
    ${officeWindow(1270)}
    ${[360, 820].map(x => `
      <circle class="glow" cx="${x + 80}" cy="40" r="160"/>
      <rect class="lamp" x="${x}" y="18" width="160" height="14" rx="4"/>`).join('')}`;
}

function officeWindow(x) {
  const buildings = [[20, 190, 50], [80, 140, 60], [150, 210, 44], [200, 170, 50]];
  return `
    <rect class="wood" x="${x}" y="100" width="280" height="380" rx="14"/>
    <rect x="${x + 14}" y="114" width="252" height="352" rx="8" fill="url(#sky)"/>
    ${buildings.map(([dx, top, w]) => `<rect class="city" x="${x + dx}" y="${100 + top}" width="${w}" height="${366 - top}"/>`).join('')}
    ${buildings.map(([dx, top]) => `<rect class="city-light" x="${x + dx + 12}" y="${130 + top}" width="10" height="12"/>`).join('')}
    <rect class="wood" x="${x + 136}" y="114" width="8" height="352"/>`;
}

function officePlant(x) {
  return `
    <ellipse class="plant" cx="${x - 22}" cy="520" rx="20" ry="60" transform="rotate(-22 ${x - 22} 520)"/>
    <ellipse class="plant" cx="${x + 22}" cy="516" rx="20" ry="64" transform="rotate(20 ${x + 22} 516)"/>
    <ellipse class="plant" cx="${x}" cy="500" rx="18" ry="68"/>
    <path class="pot" d="M${x - 38} 570 H${x + 38} L${x + 28} 640 H${x - 28} Z"/>`;
}

function whiteboard(content) {
  return `
    <rect class="metal" x="552" y="102" width="636" height="326" rx="10"/>
    <rect class="board" x="562" y="112" width="616" height="306" rx="6"/>
    ${content}`;
}

function ganttChart() {
  const rows = [[0, 160, 1], [120, 200, 3], [260, 140, 0], [300, 180, 2], [420, 150, 4]];
  return rows.map(([start, length, color], index) => `
    <rect x="${600 + start}" y="${150 + index * 48}" width="${length}" height="26" rx="5" fill="${PALETTE.shirts[color]}"/>`).join('') + `
    <line x1="980" y1="130" x2="980" y2="400" stroke="#c95a78" stroke-width="4" stroke-dasharray="10 8"/>`;
}

function productSlide() {
  return `
    ${kitchenRobot(690, 400, 0.6)}
    <rect x="810" y="150" width="190" height="140" rx="12" fill="${OFFICE.screen}"/>
    ${[0, 1, 2].map(i => `<rect x="${830 + i * 56}" y="230" width="44" height="40" rx="8" fill="${PALETTE.bottles[i]}"/>`).join('')}
    <rect x="830" y="170" width="110" height="14" rx="6" fill="#5aa77f"/>
    <rect x="830" y="196" width="70" height="10" rx="5" fill="#a9a5c0"/>
    <rect x="1030" y="140" width="120" height="250" rx="6" fill="#fff" stroke="${OFFICE.outline}" stroke-width="4"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="1046" y="${166 + i * 28}" width="${i % 2 ? 60 : 88}" height="8" rx="4" fill="#a9a5c0"/>`).join('')}
    <path d="M1050 360 q16 -24 30 0 t30 0" stroke="#4c7fb8" stroke-width="5" fill="none"/>`;
}

function meetingTable() {
  return `
    <rect class="wood-dark" x="420" y="606" width="1080" height="90"/>
    <rect class="wood" x="400" y="590" width="1120" height="22" rx="8"/>`;
}

function kitchenRobot(x, baseY, scale = 1, screenError = false) {
  const screen = screenError
    ? `<path d="M-30 -110 L30 -60 M30 -110 L-30 -60" stroke="#d8333a" stroke-width="10"/>`
    : `<rect x="-44" y="-104" width="50" height="10" rx="4" fill="#5aa77f"/><rect x="-44" y="-84" width="80" height="10" rx="4" fill="#4c7fb8"/>`;
  return `<g transform="translate(${x} ${baseY}) scale(${scale})">
    <path d="M90 -270 h34 v80 h-34" fill="none" stroke="${OFFICE.outline}" stroke-width="10"/>
    <path d="M-90 -150 L-76 -300 H76 L90 -150 Z" fill="${OFFICE.bowl}" stroke="${OFFICE.outline}" stroke-width="6"/>
    <rect x="-86" y="-322" width="172" height="26" rx="10" fill="#4a4f63"/>
    <rect x="-16" y="-340" width="32" height="20" rx="6" fill="#4a4f63"/>
    <rect x="-110" y="-150" width="220" height="150" rx="26" fill="${OFFICE.device}" stroke="${OFFICE.outline}" stroke-width="6"/>
    <rect x="-60" y="-122" width="120" height="74" rx="10" fill="${OFFICE.screen}"/>
    ${screen}
    <circle cy="-26" r="14" fill="${OFFICE.outline}"/>
  </g>`;
}

/* ---------- Open space ---------- */

function monitor(x, y) {
  const lines = [[0, 70, 0], [16, 110, 3], [16, 60, 1], [0, 90, 4], [32, 80, 2]];
  return `
    <rect class="metal" x="${x + 92}" y="${y + 120}" width="16" height="44"/>
    <rect class="metal" x="${x + 60}" y="${y + 160}" width="80" height="10" rx="4"/>
    <rect x="${x}" y="${y}" width="200" height="124" rx="8" fill="#2b2f3f"/>
    <rect x="${x + 8}" y="${y + 8}" width="184" height="108" rx="4" fill="${OFFICE.screen}"/>
    ${lines.map(([indent, length, color], index) => `
      <rect x="${x + 22 + indent}" y="${y + 22 + index * 18}" width="${length}" height="8" rx="3" fill="${PALETTE.bottles[color]}"/>`).join('')}`;
}

function desk(x) {
  return `
    <rect class="metal" x="${x + 20}" y="580" width="10" height="120"/>
    <rect class="metal" x="${x + 430}" y="580" width="10" height="120"/>
    <rect class="wood" x="${x}" y="566" width="460" height="18" rx="6"/>`;
}

function kanban() {
  const notes = [[0, 0, 4], [0, 1, 1], [0, 2, 3], [1, 0, 0], [1, 1, 4], [2, 0, 2]];
  return `
    <rect class="board" x="600" y="110" width="420" height="250" rx="8"/>
    ${[740, 880].map(x => `<line x1="${x}" y1="124" x2="${x}" y2="346" stroke="#8a86a3" stroke-width="4"/>`).join('')}
    ${notes.map(([column, row, color]) => `
      <rect x="${626 + column * 140}" y="${136 + row * 72}" width="90" height="56" rx="4" fill="${PALETTE.bottles[color]}" opacity=".9"/>`).join('')}`;
}

/* ---------- Laboratoire ---------- */

function oscilloscope(x, y) {
  return `
    <rect x="${x}" y="${y}" width="340" height="230" rx="14" fill="#4a4f63"/>
    <rect x="${x + 20}" y="${y + 22}" width="200" height="150" rx="6" fill="#10261c"/>
    <path d="M${x + 24} ${y + 100} q20 -60 40 0 t40 0 t40 0 t40 0 t40 0" stroke="#5ff29a" stroke-width="5" fill="none"/>
    ${[0, 1, 2].flatMap(row => [0, 1].map(col => `<circle cx="${x + 260 + col * 46}" cy="${y + 50 + row * 56}" r="15" fill="#2b2f3f"/>`)).join('')}`;
}

function componentDrawers() {
  return Array.from({ length: 12 }, (_, i) => {
    const x = 600 + (i % 6) * 70;
    const y = 140 + Math.floor(i / 6) * 70;
    return `<rect x="${x}" y="${y}" width="60" height="58" rx="6" fill="#8fb8d8" opacity=".85"/><rect x="${x + 20}" y="${y + 40}" width="20" height="6" rx="3" fill="#2b2230"/>`;
  }).join('');
}

function labBench() {
  return `
    <rect class="wall" width="1600" height="560"/>
    <rect class="wood-dark" y="600" width="1600" height="300"/>
    <rect class="wood" y="560" width="1600" height="44"/>
    ${componentDrawers()}
    ${oscilloscope(1080, 330)}
    <path d="M1080 470 C1000 520 960 560 900 548" stroke="#c95a78" stroke-width="6" fill="none"/>
    <path d="M1080 500 C1040 560 980 580 940 552" stroke="#4c7fb8" stroke-width="6" fill="none"/>
    <path d="M640 566 L700 520 H980 L940 566 Z" fill="${OFFICE.pcb}"/>
    <rect x="770" y="528" width="60" height="26" fill="${OFFICE.chip}"/>
    <rect x="860" y="532" width="30" height="16" fill="${OFFICE.copper}"/>
    <rect x="460" y="430" width="90" height="136" rx="10" fill="#e6c34a"/>
    <rect x="474" y="446" width="62" height="40" rx="4" fill="#2b2f3f"/>
    <circle cx="505" cy="526" r="20" fill="#2b2f3f"/>`;
}

/* ---------- Carte électronique ---------- */

function circuitBoard() {
  const traces = [
    'M0 220 H420 L480 280', 'M0 520 H360 L440 440', 'M1600 300 H1180 L1120 360',
    'M1600 640 H1220 L1140 560', 'M640 0 V180', 'M900 0 V180', 'M760 900 V660', 'M1300 900 V700 L1220 620',
  ];
  const pins = Array.from({ length: 8 }, (_, i) => i * 50);
  const missingChip = `<rect x="600" y="240" width="400" height="360" rx="12" fill="none" stroke="#e6e1f2" stroke-width="6" stroke-dasharray="20 16"/>`;
  return `
    <rect width="1600" height="900" fill="${OFFICE.pcb}"/>
    ${traces.map(d => `<path d="${d}" stroke="${OFFICE.copper}" stroke-width="14" fill="none" opacity=".85"/>`).join('')}
    ${pins.map(offset => `
      <rect x="${620 + offset}" y="200" width="22" height="40" fill="${OFFICE.copper}"/>
      <rect x="${620 + offset}" y="600" width="22" height="40" fill="${OFFICE.copper}"/>
      <rect x="560" y="${262 + offset * 0.8}" width="40" height="20" fill="${OFFICE.copper}"/>
      <rect x="1000" y="${262 + offset * 0.8}" width="40" height="20" fill="${OFFICE.copper}"/>`).join('')}
    ${missingChip}
    <rect x="1180" y="120" width="70" height="140" rx="30" fill="#4c7fb8"/>
    <rect x="1290" y="120" width="70" height="140" rx="30" fill="#4c7fb8"/>
    ${[200, 270, 340].map(y => `<rect x="300" y="${y + 400}" width="90" height="34" rx="8" fill="#e8d7b0"/>`).join('')}
    <circle cx="1420" cy="440" r="26" fill="#d8333a"/>
    <rect x="1440" y="760" width="160" height="110" fill="#a9a5c0"/>
    ${[[80, 80], [1520, 80], [80, 820]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" fill="${OFFICE.pcbDark}" stroke="${OFFICE.copper}" stroke-width="10"/>`).join('')}`;
}

/* ---------- Cuisine de test ---------- */

function steam(x, y) {
  return [[0, 0, 40], [-34, -50, 30], [30, -86, 36], [-10, -140, 26]]
    .map(([dx, dy, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="#fff" opacity=".7"/>`).join('');
}

function testKitchen() {
  const tiles = [];
  for (let y = 80; y < 560; y += 80) tiles.push(`<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="var(--sc-wall-low)" stroke-width="4"/>`);
  for (let x = 80; x < 1600; x += 80) tiles.push(`<line x1="${x}" y1="0" x2="${x}" y2="560" stroke="var(--sc-wall-low)" stroke-width="4"/>`);
  return `
    <rect class="wall" width="1600" height="560"/>
    ${tiles.join('')}
    <rect class="wood" x="600" y="60" width="560" height="150" rx="8"/>
    ${[740, 1020].map(x => `<rect class="wood-dark" x="${x}" y="120" width="40" height="10" rx="4"/>`).join('')}
    <rect class="wood-dark" y="600" width="1600" height="300"/>
    <rect class="wood" y="560" width="1600" height="44"/>
    ${kitchenRobot(1000, 562, 1.05, true)}
    ${steam(1000, 190)}
    <path d="M700 562 Q700 500 760 500 H840 Q900 500 900 562 Z" fill="${OFFICE.bowl}" stroke="${OFFICE.outline}" stroke-width="5"/>
    <ellipse cx="800" cy="504" rx="70" ry="16" fill="#e8d7b0"/>
    <path d="M1260 562 L1280 400 H1400 L1420 562 Z" fill="#e8d7b0"/>
    <rect x="1300" y="450" width="80" height="40" rx="6" fill="#c8792c"/>`;
}

/* ---------- Usine ---------- */

function factory() {
  return `
    <rect class="wall-low" width="1600" height="600"/>
    ${[160, 560, 960, 1360].map(x => `<rect x="${x}" y="80" width="240" height="170" rx="6" fill="url(#sky)" stroke="var(--sc-metal)" stroke-width="10"/>`).join('')}
    <rect class="floor" y="600" width="1600" height="300"/>
    ${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 100} 860 l50 0 l-30 40 l-50 0 Z" fill="#e6c34a"/>`).join('')}
    <rect y="636" width="1600" height="44" fill="#3a3346"/>
    ${Array.from({ length: 17 }, (_, i) => `<circle cx="${i * 100}" cy="690" r="14" fill="var(--sc-metal)"/>`).join('')}
    <rect class="metal" y="626" width="1600" height="12"/>
    ${[200, 500, 800, 1500].map(x => kitchenRobot(x, 626, 0.5)).join('')}
    <rect class="metal" x="1120" y="360" width="24" height="270"/>
    <rect class="metal" x="1356" y="360" width="24" height="270"/>
    <rect class="metal" x="1110" y="340" width="280" height="40" rx="6"/>
    <circle cx="1250" cy="360" r="12" fill="#5ff29a"/>
    ${kitchenRobot(1250, 626, 0.5)}`;
}

/* ---------- Scènes ---------- */

Object.assign(SCENES, {
  reunion: () => officeRoom() + whiteboard(ganttChart()) + officePlant(220) + meetingTable() +
    seatedPerson(620, 0) + seatedPerson(900, 3) + seatedPerson(1180, 1),
  openspace: () => officeRoom() + kanban() + officePlant(200) + desk(380) + desk(900) +
    monitor(560, 420) + monitor(1080, 420) + seatedPerson(500, 4) + seatedPerson(1020, 2),
  labo: () => labBench(),
  carteVide: () => circuitBoard(),
  cuisine: () => testKitchen(),
  usine: () => factory(),
  demo: () => officeRoom() + whiteboard(productSlide()) + meetingTable() + kitchenRobot(1000, 592, 0.35) +
    seatedPerson(560, 1) + seatedPerson(800, 2) + seatedPerson(1300, 0),
});
