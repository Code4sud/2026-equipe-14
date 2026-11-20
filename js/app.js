const JOBS = {
  barman: BARMAN,
  chefProjetEmbarque: CHEF_PROJET_EMBARQUE,
  medecin: MEDECIN,
  technicienEaux: TECHNICIEN_EAUX,
  chargeMarketing: CHARGE_MARKETING,
  chauffeurRoutier: CHAUFFEUR_ROUTIER,
};

const SECTORS = {
  industrie: {
    title: 'Industrie et environnement',
    keywords: /industrie|environnement|ecolog/,
    jobs: ['technicienEaux'],
    upcoming: [['Technicien de maintenance', 'i-wrench'], ['Électricien', 'i-zap'], ['Agent de tri', 'i-leaf']],
  },
  commerce: {
    title: 'Commerce, communication et culture',
    keywords: /commerce|communication|culture|vente/,
    jobs: ['chargeMarketing'],
    upcoming: [['Vendeur', 'i-bag'], ['Community manager', 'i-chat'], ['Libraire', 'i-book']],
  },
  hotellerie: {
    title: 'Hôtellerie, restauration et tourisme',
    keywords: /hotellerie|restauration|tourisme/,
    jobs: ['barman'],
    upcoming: [['Cuisinier', 'i-chef'], ['Réceptionniste', 'i-bell'], ['Serveur en salle', 'i-utensils']],
  },
  numerique: {
    title: 'Numérique, recherche et innovation',
    keywords: /numerique|informatique|recherche|innovation/,
    jobs: ['chefProjetEmbarque'],
    upcoming: [['Développeur web', 'i-code'], ['Technicien réseau', 'i-wifi'], ['Data scientist', 'i-chart']],
  },
  mobilite: {
    title: 'Mobilité, logistique et transport',
    keywords: /mobilite|logistique|transport/,
    jobs: ['chauffeurRoutier'],
    upcoming: [['Cariste', 'i-box'], ['Conducteur de bus', 'i-train'], ['Logisticien', 'i-chart']],
  },
  sante: {
    title: 'Santé et social',
    keywords: /sante|social|soin/,
    jobs: ['medecin'],
    upcoming: [['Infirmier', 'i-heart'], ['Pharmacien', 'i-pill'], ['Aide-soignant', 'i-users']],
  },
};

const SCREENS = ['intro', 'guide', 'sectorSelect', 'jobInfo', 'ending'];

let selectedJob = null;

/* ---------- Navigation ---------- */

function showScreen(id) {
  SCREENS.forEach(screen => (screen === id ? show(screen) : hide(screen)));
  document.querySelector('.stage').inert = Boolean(id);
  if (id) $(id).querySelector('[data-autofocus]')?.focus({ preventScroll: true });
}

function openHome() {
  showScreen('intro');
  stopMusic();
  $('searchInput').value = '';
  hide('searchError');
}

function jobTile(id) {
  const job = JOBS[id];
  return `<button type="button" class="card jobTile available" data-job="${id}">
    <span class="cardIcon"><svg class="icon"><use href="#${job.icon}"/></svg></span>
    <span><span class="cardTitle">${job.name}</span><span class="cardHint">${job.pitch}</span></span>
    <svg class="icon cardArrow"><use href="#i-arrow-right"/></svg>
  </button>`;
}

function upcomingTile([name, icon]) {
  return `<div class="card jobTile future">
    <span class="cardIcon"><svg class="icon"><use href="#${icon}"/></svg></span>
    <span><span class="cardTitle">${name}</span><span class="cardHint">À découvrir bientôt</span></span>
  </div>`;
}

function openSector(key) {
  const sector = SECTORS[key];
  $('sectorTitle').textContent = sector.title;
  $('jobTiles').innerHTML = sector.jobs.map(jobTile).join('') + sector.upcoming.map(upcomingTile).join('');
  $('jobTiles').querySelector('[data-job]').dataset.autofocus = '';
  hide('searchError');
  showScreen('sectorSelect');
}

function fillList(id, items) {
  $(id).replaceChildren(...items.map(text => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));
}

function openJobInfo(id) {
  const job = JOBS[id];
  selectedJob = id;
  $('infoIcon').setAttribute('href', `#${job.icon}`);
  $('infoTitle').textContent = job.name;
  $('infoSummary').textContent = job.info.summary;
  $('infoSummaryTab').textContent = job.info.summary;
  $('infoSalary').textContent = euros(job.info.salary.median);
  $('infoSalarySource').textContent = job.info.salary.reference;
  $('infoSalarySource').href = job.info.salary.url;
  fillList('infoMissions', job.info.missions);
  fillList('infoQualities', job.info.qualities);
  fillList('infoStudies', job.info.studies);
  fillList('infoConditions', job.info.conditions);
  showInfoTab(0);
  showScreen('jobInfo');
}

function showInfoTab(index) {
  document.querySelectorAll('.infoTabs button').forEach((tab, i) => tab.setAttribute('aria-selected', i === index));
  document.querySelectorAll('.infoGrid section').forEach((section, i) => section.classList.toggle('active', i === index));
}

document.querySelector('.infoTabs').addEventListener('click', event => {
  const tab = event.target.closest('[data-tab]');
  if (tab) showInfoTab(Number(tab.dataset.tab));
});

function startJob(id) {
  showScreen(null);
  startGame(JOBS[id]);
  chooseTrack(JOBS[id].sector);
  startMusic();
}

function showSearchError(message) {
  $('searchError').textContent = message;
  show('searchError');
}

$('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const text = $('searchInput').value.trim();
  $('searchInput').value = '';
  const query = normalize(text);
  const jobId = Object.keys(JOBS).find(id => JOBS[id].keywords.test(query));
  const sectorKey = Object.keys(SECTORS).find(key => SECTORS[key].keywords.test(query));

  if (query && jobId) openJobInfo(jobId);
  else if (query && sectorKey) openSector(sectorKey);
  else openGuide(text);
});

document.querySelectorAll('.sectorCard').forEach(card => {
  card.addEventListener('click', () => {
    if (SECTORS[card.dataset.sector]) openSector(card.dataset.sector);
    else showSearchError('Cette famille de métiers arrive bientôt. Découvre en attendant les métiers des autres familles.');
  });
});

$('jobTiles').addEventListener('click', event => {
  const tile = event.target.closest('[data-job]');
  if (tile) openJobInfo(tile.dataset.job);
});

$('sectorBack').addEventListener('click', () => showScreen('intro'));
$('infoBack').addEventListener('click', () => openSector(JOBS[selectedJob].sector));
$('howToStart').addEventListener('click', () => {
  $('howToPanel').hidePopover();
  startJob(selectedJob);
});
$('homeBtn').addEventListener('click', openHome);
$('gameHomeBtn').addEventListener('click', openHome);
$('replayBtn').addEventListener('click', () => startGame());
$('restartBtn').addEventListener('click', () => startGame());
$('backBtn').addEventListener('click', goBack);
$('endBackBtn').addEventListener('click', goBack);

/* ---------- Clavier : touches 1, 2, 3 ---------- */

document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.closest?.('input, textarea, select')) return;
  if (SCREENS.some(isVisible)) return;

  const button = $('choices').children[Number(event.key) - 1];
  if (/^[1-9]$/.test(event.key) && button) {
    event.preventDefault();
    button.click();
  }
});

/* ---------- Pas de zoom ---------- */

addEventListener('wheel', event => {
  if (event.ctrlKey || event.metaKey) event.preventDefault();
}, { passive: false });

addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && ['+', '-', '=', '0'].includes(event.key)) event.preventDefault();
});

['gesturestart', 'gesturechange'].forEach(type => addEventListener(type, event => event.preventDefault()));

/* ---------- Bandeau du hackathon ---------- */

function fitBandeau() {
  const height = $('c4s-bandeau')?.offsetHeight || 0;
  document.documentElement.style.setProperty('--bandeau', `${height}px`);
}

addEventListener('DOMContentLoaded', fitBandeau);
addEventListener('load', fitBandeau);
addEventListener('resize', fitBandeau);
