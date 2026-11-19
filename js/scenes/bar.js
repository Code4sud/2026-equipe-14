/* Décors du métier barman. */

/* ---------- Salle ---------- */

function walls() {
  return `
    <rect class="wall" width="1600" height="600"/>
    <rect class="wall-low" y="470" width="1600" height="130"/>
    <rect class="wood" y="462" width="1600" height="10"/>
    <rect class="floor" y="600" width="1600" height="300"/>
    ${[650, 715, 790, 870].map(y => `<line class="floor-line" x1="0" y1="${y}" x2="1600" y2="${y}"/>`).join('')}`;
}

function cityWindow() {
  const buildings = [[140, 300, 60, 100], [205, 255, 52, 145], [262, 318, 70, 82], [337, 278, 56, 122], [398, 330, 30, 70]];
  const lights = buildings.flatMap(([x, y, w, h]) =>
    [0, 1, 2].flatMap(row => [0, 1].map(col => {
      const lx = x + 10 + col * (w / 2 - 4);
      const ly = y + 14 + row * 28;
      return ly + 12 < y + h ? `<rect class="city-light" x="${lx}" y="${ly}" width="10" height="12" rx="2"/>` : '';
    })));

  return `
    <rect class="wood" x="120" y="110" width="320" height="300" rx="18"/>
    <g clip-path="url(#windowGlass)">
      <rect x="136" y="126" width="288" height="268" fill="url(#sky)"/>
      ${buildings.map(([x, y, w, h]) => `<rect class="city" x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}
      ${lights.join('')}
    </g>
    <rect class="wood" x="276" y="126" width="8" height="268"/>
    <rect class="wood" x="136" y="256" width="288" height="8"/>`;
}

function bottle(x, baseY, height, color, width = 26) {
  const neck = width * 0.38;
  return `
    <rect x="${x}" y="${baseY - height}" width="${width}" height="${height}" rx="7" fill="${color}"/>
    <rect x="${x + (width - neck) / 2}" y="${baseY - height - 18}" width="${neck}" height="22" rx="3" fill="${color}"/>
    <rect x="${x + 5}" y="${baseY - height * 0.6}" width="${width - 10}" height="${height * 0.28}" rx="3" fill="#fff" opacity=".55"/>`;
}

function backBar() {
  const shelf = (y, offset) => Array.from({ length: 14 }, (_, i) => {
    const height = 50 + ((i * 37 + offset) % 4) * 12;
    return bottle(818 + i * 50, y, height, PALETTE.bottles[(i + offset) % PALETTE.bottles.length]);
  }).join('');

  return `
    <rect class="panel" x="780" y="100" width="780" height="370" rx="18"/>
    ${shelf(238, 0)}
    <rect class="wood" x="800" y="238" width="740" height="12" rx="4"/>
    ${shelf(368, 2)}
    <rect class="wood" x="800" y="368" width="740" height="12" rx="4"/>`;
}

function lamps() {
  return [900, 1150, 1400].map(x => `
    <circle class="glow" cx="${x}" cy="150" r="170"/>
    <rect class="wood-dark" x="${x - 2}" y="0" width="4" height="86"/>
    <path class="wood-dark" d="M${x - 44} 128 Q${x} 62 ${x + 44} 128 Z"/>
    <circle class="lamp" cx="${x}" cy="128" r="12"/>`).join('');
}

function chair(x, flip = false) {
  const back = flip ? x + 46 : x - 54;
  return `
    <rect class="wood-dark" x="${back}" y="560" width="8" height="160" rx="4"/>
    <rect class="wood" x="${x - 54}" y="640" width="108" height="14" rx="6"/>
    <rect class="wood-dark" x="${x - 48}" y="654" width="7" height="104"/>
    <rect class="wood-dark" x="${x + 41}" y="654" width="7" height="104"/>`;
}

function sideTable() {
  return `
    ${chair(170)}
    ${chair(430, true)}
    <rect class="wood-dark" x="292" y="600" width="16" height="152"/>
    <ellipse class="wood-dark" cx="300" cy="752" rx="60" ry="10"/>
    <ellipse class="wood" cx="300" cy="600" rx="112" ry="18"/>`;
}

function plant() {
  return `
    <ellipse class="plant" cx="588" cy="470" rx="22" ry="62" transform="rotate(-24 588 470)"/>
    <ellipse class="plant" cx="628" cy="462" rx="22" ry="66" transform="rotate(20 628 462)"/>
    <ellipse class="plant" cx="608" cy="444" rx="20" ry="70"/>
    <path class="pot" d="M570 520 H646 L634 602 H582 Z"/>`;
}

function counter() {
  const panels = [760, 980, 1200, 1420].map(x => `<rect x="${x}" y="566" width="170" height="160" rx="10" fill="none" stroke="var(--sc-counter-top)" stroke-width="3" opacity=".5"/>`).join('');
  return `
    <rect class="counter" x="720" y="530" width="880" height="252"/>
    ${panels}
    <rect class="rail" x="720" y="744" width="880" height="10" rx="5"/>
    <rect class="counter-top" x="700" y="500" width="900" height="34" rx="10"/>`;
}

function stool(x) {
  return `
    <rect class="metal" x="${x - 5}" y="690" width="10" height="150"/>
    <ellipse cx="${x}" cy="792" rx="30" ry="7" fill="none" class="metal-line"/>
    <ellipse class="metal" cx="${x}" cy="842" rx="38" ry="9"/>
    <ellipse cx="${x}" cy="690" rx="50" ry="15" fill="${PALETTE.shirts[0]}"/>`;
}

function stools(positions = [860, 1100, 1340]) {
  return positions.map(stool).join('');
}

/* ---------- Désordre ---------- */

function smallGlass(x, y, tilt = 0) {
  return `<path class="glass" transform="rotate(${tilt} ${x} ${y})" d="M${x - 16} ${y - 44} H${x + 16} L${x + 12} ${y} H${x - 12} Z"/>`;
}

function mess() {
  return `
    <ellipse class="stain" cx="1010" cy="516" rx="80" ry="9"/>
    <ellipse class="stain" cx="1290" cy="518" rx="60" ry="8"/>
    ${smallGlass(780, 500)}${smallGlass(818, 500)}${smallGlass(856, 500)}${smallGlass(960, 500, -6)}
    ${smallGlass(1180, 500)}${smallGlass(1222, 500)}
    ${smallGlass(1430, 492, 78)}${smallGlass(1060, 494, -82)}
    ${bottle(1330, 500, 54, PALETTE.bottles[1])}
    <path class="wood-dark" d="M1290 640 l70 -60 l14 12 l-70 60 Z" opacity=".9"/>
    <path d="M1080 500 l20 -18 l26 6 l-6 14 Z" fill="#fff" opacity=".85"/>
    <path d="M1520 500 l18 -14 l22 8 l-8 8 Z" fill="#fff" opacity=".8"/>
    ${smallGlass(260, 590)}${smallGlass(330, 590, -8)}
    <circle cx="560" cy="830" r="14" fill="#fff" opacity=".8"/>
    <circle cx="660" cy="860" r="11" fill="#fff" opacity=".75"/>
    <ellipse class="stain" cx="460" cy="800" rx="70" ry="10"/>`;
}

/* ---------- Gros plans ---------- */

function bottlesCloseUp() {
  const blurredShelf = Array.from({ length: 9 }, (_, i) => bottle(80 + i * 180, 300, 150, PALETTE.bottles[i % 5], 80)).join('');
  return `
    <rect class="panel" width="1600" height="900"/>
    <g filter="url(#blur)" opacity=".55">
      ${blurredShelf}
      <rect class="wood" y="300" width="1600" height="20"/>
      <circle class="lamp" cx="1400" cy="90" r="40"/>
    </g>
    <rect class="counter-top" y="640" width="1600" height="260"/>
    <rect class="wood-dark" y="632" width="1600" height="12"/>

    <ellipse class="stain" cx="700" cy="662" rx="78" ry="10"/>
    <rect x="678" y="166" width="44" height="30" rx="6" fill="#d8333a"/>
    <path fill="#3d1a16" d="M684 196 H716 C716 240 742 262 750 300 C758 340 740 370 742 410 C744 450 762 480 762 540 V640 Q762 660 742 660 H658 Q638 660 638 640 V540 C638 480 656 450 658 410 C660 370 642 340 650 300 C658 262 684 240 684 196 Z"/>
    <rect x="638" y="468" width="124" height="74" fill="#d8333a"/>
    <path d="M644 512 C672 490 706 528 756 500" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path class="shine" d="M664 300 C656 340 670 370 668 410 L676 410 C678 370 664 340 672 300 Z"/>

    <ellipse class="stain" cx="930" cy="662" rx="64" ry="8"/>
    <path class="glass" d="M868 470 H992 L978 648 Q977 660 965 660 H895 Q883 660 882 648 Z"/>
    <path class="shine" d="M888 486 H900 L910 640 H898 Z"/>

    <ellipse class="stain" cx="1180" cy="662" rx="90" ry="10"/>
    <rect x="1160" y="226" width="40" height="34" rx="5" fill="#2b2230"/>
    <path fill="#c8792c" d="M1164 258 H1196 V330 C1196 362 1260 362 1260 402 V640 Q1260 660 1240 660 H1120 Q1100 660 1100 640 V402 C1100 362 1164 362 1164 330 Z"/>
    <rect x="1112" y="450" width="136" height="112" rx="10" fill="#f5e6c8"/>
    <rect x="1134" y="478" width="92" height="10" rx="5" fill="#8a5a2e"/>
    <rect x="1148" y="502" width="64" height="8" rx="4" fill="#c8792c"/>
    <rect x="1140" y="526" width="80" height="8" rx="4" fill="#c8792c"/>
    <path class="shine" d="M1116 420 H1128 V630 H1116 Z"/>`;
}

function floorCloseUp() {
  const planks = Array.from({ length: 15 }, (_, i) => {
    const bottomX = -600 + i * 200;
    const topX = 800 + (bottomX - 800) * 0.45;
    return `<line class="floor-line" x1="${bottomX}" y1="900" x2="${topX}" y2="344"/>`;
  }).join('');

  return `
    <rect class="counter" width="1600" height="300"/>
    ${[120, 520, 920, 1320].map(x => `<rect x="${x}" y="40" width="220" height="220" rx="12" fill="none" stroke="var(--sc-counter-top)" stroke-width="4" opacity=".5"/>`).join('')}
    <rect class="rail" y="286" width="1600" height="14"/>
    <rect class="wood-dark" y="300" width="1600" height="44"/>
    <rect class="floor" y="344" width="1600" height="556"/>
    ${planks}
    <rect class="metal" x="380" y="0" width="16" height="330"/>
    <ellipse class="metal" cx="388" cy="334" rx="62" ry="14"/>`;
}

function brokenGlass() {
  const shards = [
    'M1040 520 l40 -26 l14 34 Z',
    'M1120 560 l30 -10 l-6 34 Z',
    'M980 590 l26 -30 l20 28 Z',
    'M1210 520 l36 6 l-22 24 Z',
    'M1290 600 l22 -26 l12 30 Z',
    'M1160 470 l18 -22 l16 24 Z',
    'M920 520 l22 -6 l-4 22 Z',
  ];
  return `
    <ellipse class="puddle" cx="1130" cy="560" rx="270" ry="74"/>
    <ellipse class="shine" cx="1060" cy="540" rx="80" ry="12"/>
    ${shards.map(d => `<path class="glass" d="${d}"/>`).join('')}
    <path class="glass" d="M1100 540 a46 14 0 0 0 92 0 l-10 -30 l-18 18 l-20 -24 l-16 22 Z"/>`;
}

function wetFloorSign() {
  return `
    <path fill="#f2c23a" d="M1150 330 L1226 640 H1196 L1150 420 L1104 640 H1074 Z"/>
    <path fill="#f2c23a" d="M1150 330 L1218 610 H1082 Z"/>
    <path d="M1150 430 L1192 520 H1108 Z" fill="none" stroke="#2b2230" stroke-width="9" stroke-linejoin="round"/>
    <rect x="1146" y="458" width="8" height="34" rx="4" fill="#2b2230"/>
    <circle cx="1150" cy="505" r="5" fill="#2b2230"/>`;
}

function broom() {
  return `
    <g transform="rotate(16 1415 650)">
      <rect class="wood" x="1408" y="250" width="14" height="410" rx="7"/>
      <rect class="wood-dark" x="1380" y="640" width="70" height="22" rx="6"/>
      <path fill="#e0b04a" d="M1372 660 H1458 L1486 760 H1344 Z"/>
    </g>`;
}

/* ---------- Scènes ---------- */

function barRoom(extra = '') {
  return walls() + cityWindow() + backBar() + lamps() + plant() + sideTable() + counter() + extra;
}

Object.assign(SCENES, {
  calme: () => barRoom(stools()),
  desordre: () => barRoom(stools() + mess()),
  client: () => barRoom(stools() + seatedPerson(1100, 2)),
  affluence: () => barRoom(
    stools() +
    seatedPerson(860, 1) + seatedPerson(1100, 2) + seatedPerson(1340, 3) +
    standingPerson(520, 4, 0.92) + standingPerson(640, 0, 0.96) + standingPerson(1520, 1, 0.9)
  ),
  bouteilles: () => bottlesCloseUp(),
  verre: () => floorCloseUp() + brokenGlass(),
  nettoyage: () => floorCloseUp() + wetFloorSign() + broom(),
});
