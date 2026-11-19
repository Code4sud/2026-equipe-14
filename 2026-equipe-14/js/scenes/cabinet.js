/* Décors du métier médecin généraliste. */

const CLINIC = {
  skin: '#e8b48f',
  lips: '#a8434f',
  mouth: '#5a1f2a',
  throat: '#e08a8a',
  throatRed: '#d65c66',
  tonsil: '#cf6170',
  deposit: '#f5f1e3',
  lung: '#e58aa0',
  lungAlert: '#d8475a',
  screen: '#1d2233',
  white: '#f4f2f8',
};

/* ---------- Cabinet ---------- */

function diplomas() {
  return [600, 760].map(x => `
    <rect class="wood" x="${x}" y="130" width="130" height="96" rx="6"/>
    <rect x="${x + 10}" y="140" width="110" height="76" fill="${CLINIC.white}"/>
    <rect x="${x + 26}" y="160" width="78" height="8" rx="4" fill="#a9a5c0"/>
    <rect x="${x + 36}" y="180" width="58" height="6" rx="3" fill="#a9a5c0"/>
    <circle cx="${x + 96}" cy="200" r="9" fill="#d9b54a"/>`).join('');
}

function bookshelf(x) {
  const books = Array.from({ length: 9 }, (_, i) => `<rect x="${x + 12 + i * 22}" y="${300 - (i % 3) * 10}" width="18" height="${60 + (i % 3) * 10}" fill="${PALETTE.bottles[i % 5]}"/>`);
  return `
    <rect class="wood-dark" x="${x}" y="360" width="220" height="12"/>
    ${books.join('')}`;
}

function doctorDesk() {
  return `
    <rect class="wood-dark" y="690" width="1600" height="210"/>
    <rect class="wood" y="660" width="1600" height="36"/>
    <rect x="1080" y="460" width="260" height="170" rx="10" fill="#2b2f3f"/>
    <rect x="1094" y="474" width="232" height="142" rx="4" fill="${CLINIC.screen}"/>
    ${[0, 1, 2, 3].map(i => `<rect x="1112" y="${492 + i * 28}" width="${150 - i * 24}" height="10" rx="4" fill="${PALETTE.bottles[i]}"/>`).join('')}
    <rect class="metal" x="1196" y="630" width="28" height="30"/>
    <path d="M420 640 q40 -60 90 -10 q30 30 70 0" stroke="#4a4f63" stroke-width="10" fill="none"/>
    <circle cx="590" cy="630" r="18" fill="#a9a5c0"/>`;
}

function clinicRoom() {
  return `
    <rect class="wall" width="1600" height="660"/>
    <rect class="wall-low" y="560" width="1600" height="100"/>
    ${officeWindow(160)}
    ${diplomas()}
    ${bookshelf(980)}`;
}

function cabinet() {
  return clinicRoom() + frontPerson(800, 690, 2, true) + doctorDesk();
}

/* ---------- Salle d'examen ---------- */

function examRoom() {
  return `
    <rect class="wall" width="1600" height="620"/>
    <rect class="floor" y="620" width="1600" height="280"/>
    ${[700, 790].map(y => `<line class="floor-line" x1="0" y1="${y}" x2="1600" y2="${y}"/>`).join('')}
    <rect x="1240" y="120" width="200" height="280" rx="10" fill="${CLINIC.white}" stroke="var(--sc-metal)" stroke-width="8"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${1340 - (60 - i * 10)}" y="${150 + i * 48}" width="${120 - i * 20}" height="${30 - i * 4}" rx="4" fill="#2b2230"/>`).join('')}
    <rect class="metal" x="560" y="40" width="12" height="220"/>
    <path d="M566 260 L640 300" stroke="var(--sc-metal)" stroke-width="12"/>
    <circle class="lamp" cx="660" cy="312" r="30"/>
    <rect x="560" y="600" width="660" height="40" rx="12" fill="#58a6c9"/>
    <rect x="600" y="570" width="580" height="34" rx="10" fill="${CLINIC.white}"/>
    <rect class="metal" x="600" y="640" width="20" height="180"/>
    <rect class="metal" x="1160" y="640" width="20" height="180"/>
    ${frontPerson(890, 600, 2, true)}`;
}

/* ---------- Dossier médical ---------- */

function medicalRecord() {
  return `
    <rect class="wall-low" width="1600" height="900"/>
    <rect x="360" y="60" width="880" height="600" rx="20" fill="#2b2f3f"/>
    <rect x="386" y="86" width="828" height="548" rx="8" fill="${CLINIC.white}"/>
    <rect x="386" y="86" width="828" height="60" fill="#6c5ad6"/>
    <rect x="410" y="104" width="220" height="24" rx="6" fill="#fff" opacity=".8"/>
    <rect x="420" y="180" width="140" height="160" rx="10" fill="#c9c6dc"/>
    <circle cx="490" cy="240" r="40" fill="${CLINIC.skin}"/>
    <path d="M430 340 q60 -70 120 0" fill="#58a6c9"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="600" y="${190 + i * 44}" width="${520 - (i % 3) * 120}" height="16" rx="6" fill="#a9a5c0"/>`).join('')}
    <rect x="420" y="380" width="140" height="40" rx="20" fill="#e58aa0"/>
    <rect x="420" y="440" width="140" height="40" rx="20" fill="#e6a14f"/>
    <rect class="metal" x="760" y="660" width="80" height="60"/>
    <rect class="wood" x="200" y="740" width="1200" height="160"/>
    <rect x="520" y="770" width="560" height="70" rx="10" fill="#4a4f63"/>`;
}

/* ---------- Urgence ---------- */

function ambulance() {
  return `
    <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
    ${[[80, 260, 240], [360, 200, 200], [1180, 240, 260], [1460, 180, 140]].map(([x, top, w]) => `<rect class="city" x="${x}" y="${top}" width="${w}" height="${700 - top}"/>`).join('')}
    <rect class="floor" y="700" width="1600" height="200"/>
    <rect x="460" y="420" width="700" height="260" rx="30" fill="${CLINIC.white}"/>
    <path d="M1160 480 H1290 L1380 580 V680 H1160 Z" fill="${CLINIC.white}"/>
    <path d="M1180 500 H1280 L1350 580 H1180 Z" fill="#8fb8d8"/>
    <rect x="460" y="560" width="920" height="30" fill="#d8333a"/>
    <rect x="740" y="460" width="40" height="120" fill="#d8333a"/>
    <rect x="700" y="500" width="120" height="40" fill="#d8333a"/>
    <rect x="560" y="390" width="80" height="34" rx="8" fill="#4c7fb8"/>
    <circle cx="600" cy="380" r="70" fill="#4c7fb8" opacity=".35"/>
    ${[640, 1220].map(x => `<circle cx="${x}" cy="690" r="54" fill="#2b2230"/><circle cx="${x}" cy="690" r="22" fill="#a9a5c0"/>`).join('')}`;
}

/* ---------- Images d'examen ---------- */

function throat(variant) {
  const back = variant === 'B' ? CLINIC.throatRed : CLINIC.throat;
  const deposits = variant === 'B'
    ? [[640, 470], [610, 520], [665, 545], [960, 470], [990, 520], [935, 545]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="${CLINIC.deposit}"/>`).join('')
    : '';
  const mouth = `
    <rect width="1600" height="900" fill="${CLINIC.skin}"/>
    <ellipse cx="800" cy="460" rx="420" ry="330" fill="${CLINIC.lips}"/>
    <ellipse cx="800" cy="460" rx="370" ry="280" fill="${CLINIC.mouth}"/>
    <ellipse cx="800" cy="440" rx="250" ry="200" fill="${back}"/>
    <path d="M770 250 Q800 230 830 250 L820 360 Q800 390 780 360 Z" fill="${CLINIC.tonsil}"/>
    <ellipse cx="640" cy="500" rx="70" ry="110" fill="${CLINIC.tonsil}"/>
    <ellipse cx="960" cy="500" rx="70" ry="110" fill="${CLINIC.tonsil}"/>
    ${deposits}
    <ellipse cx="800" cy="720" rx="300" ry="110" fill="#e58aa0"/>
    <rect x="460" y="170" width="680" height="40" rx="18" fill="${CLINIC.white}"/>`;
  return variant === 'C' ? `<g filter="url(#blurStrong)">${mouth}</g>` : mouth;
}

function breathing(variant) {
  const alert = variant === 'B';
  const lung = alert ? CLINIC.lungAlert : CLINIC.lung;
  const wave = alert
    ? 'M160 760 l40 -90 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -140 l40 140 l40 -50'
    : 'M160 760 C320 640 480 640 640 760 S960 880 1120 760 S1360 640 1440 700';
  const scene = `
    <rect class="panel" width="1600" height="900"/>
    <rect x="770" y="80" width="60" height="200" rx="24" fill="${CLINIC.white}"/>
    <path d="M770 250 C600 250 520 330 500 460 C480 600 540 640 640 640 C740 640 780 560 780 440 Z" fill="${lung}"/>
    <path d="M830 250 C1000 250 1080 330 1100 460 C1120 600 1060 640 960 640 C860 640 820 560 820 440 Z" fill="${lung}"/>
    <path d="${wave}" stroke="${alert ? '#d8333a' : '#5aa77f'}" stroke-width="16" fill="none" stroke-linejoin="round"/>
    ${alert ? '<path d="M1300 120 L1380 260 H1220 Z" fill="#f2c23a"/><rect x="1292" y="160" width="16" height="56" rx="6" fill="#2b2230"/><circle cx="1300" cy="236" r="9" fill="#2b2230"/>' : ''}`;
  if (variant !== 'C') return scene;
  const noise = Array.from({ length: 60 }, (_, i) => `<rect x="${(i * 337) % 1600}" y="${(i * 211) % 900}" width="120" height="40" fill="#fff" opacity=".35"/>`).join('');
  return `<g filter="url(#blurStrong)">${scene}</g>${noise}`;
}

function face(variant) {
  const pain = variant === 'B'
    ? [[690, 470], [910, 470], [800, 330]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="70" fill="#d8333a" opacity=".55"/>`).join('')
    : '';
  const brows = variant === 'B'
    ? '<path d="M630 360 L740 390 M970 360 L860 390" stroke="#2b2230" stroke-width="18"/>'
    : '<path d="M630 380 H740 M860 380 H970" stroke="#2b2230" stroke-width="18"/>';
  const portrait = `
    <rect class="panel" width="1600" height="900"/>
    <ellipse cx="800" cy="480" rx="300" ry="380" fill="${CLINIC.skin}"/>
    <path d="M500 400 Q500 90 800 90 Q1100 90 1100 400 Q1000 220 800 220 Q600 220 500 400 Z" fill="#5a3825"/>
    ${brows}
    <ellipse cx="690" cy="430" rx="30" ry="22" fill="#2b2230"/>
    <ellipse cx="910" cy="430" rx="30" ry="22" fill="#2b2230"/>
    <path d="M800 440 L760 580 H840 Z" fill="#c98e66"/>
    <path d="M720 680 Q800 ${variant === 'B' ? 650 : 720} 880 680" stroke="#a8434f" stroke-width="16" fill="none"/>
    ${pain}`;
  return variant === 'C' ? `<g filter="url(#blurStrong)">${portrait}</g>` : portrait;
}

/* ---------- Scènes ---------- */

Object.assign(SCENES, {
  cabinet: () => cabinet(),
  examen: () => examRoom(),
  dossier: () => medicalRecord(),
  urgence: () => ambulance(),
  gorgeA: () => throat('A'),
  gorgeB: () => throat('B'),
  gorgeC: () => throat('C'),
  respA: () => breathing('A'),
  respB: () => breathing('B'),
  respC: () => breathing('C'),
  sinusA: () => face('A'),
  sinusB: () => face('B'),
  sinusC: () => face('C'),
});
