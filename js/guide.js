/* Guide d'orientation : quelques questions, puis les métiers qui te correspondent, en pourcentage. */

const GUIDE_QUESTIONS = [
  {
    text: 'Qu’est-ce qui te plaît le plus ?',
    options: [
      { label: 'Aider et soigner les gens', match: /aid|soign|sant|malad/, weights: { medecin: 3, barman: 1 } },
      { label: 'Inventer et fabriquer des objets techniques', match: /invent|fabri|techn|robot|electro|info/, weights: { chefProjetEmbarque: 3, technicienEaux: 1 } },
      { label: 'Convaincre et communiquer', match: /convain|communi|pub|vend|reseau/, weights: { chargeMarketing: 3, barman: 1 } },
      { label: 'Bouger, conduire, voyager', match: /boug|condui|voyag|route|camion/, weights: { chauffeurRoutier: 3, technicienEaux: 1 } },
    ],
  },
  {
    text: 'Tu te vois plutôt travailler…',
    options: [
      { label: 'Dehors ou sur la route', match: /dehors|route|exterieur/, weights: { chauffeurRoutier: 3, technicienEaux: 2 } },
      { label: 'Au contact des clients', match: /client|public|contact/, weights: { barman: 3, chargeMarketing: 1, medecin: 1 } },
      { label: 'Dans un bureau ou un labo', match: /bureau|labo/, weights: { chefProjetEmbarque: 3, chargeMarketing: 2, medecin: 1 } },
      { label: 'Sur le terrain, avec des machines', match: /terrain|machine|usine/, weights: { technicienEaux: 3, chefProjetEmbarque: 1 } },
    ],
  },
  {
    text: 'Tu préfères travailler…',
    options: [
      { label: 'Seul et en autonomie', match: /seul|autonom/, weights: { chauffeurRoutier: 3, technicienEaux: 1, medecin: 1 } },
      { label: 'En équipe', match: /equipe|ensemble|groupe/, weights: { barman: 2, chefProjetEmbarque: 2, chargeMarketing: 2 } },
      { label: 'En menant un projet', match: /projet|diriger|mener|chef/, weights: { chefProjetEmbarque: 3, chargeMarketing: 2 } },
    ],
  },
  {
    text: 'Combien d’années d’études es-tu prêt à faire ?',
    options: [
      { label: 'Le moins possible, je veux vite travailler', match: /vite|moins|pas d.etude|aucune/, weights: { chauffeurRoutier: 3, barman: 3, technicienEaux: 1 } },
      { label: '2 à 3 ans (BTS, BUT)', match: /bts|but|2|3|deux|trois/, weights: { technicienEaux: 3, barman: 1, chargeMarketing: 1 } },
      { label: '5 ans ou plus', match: /5|cinq|master|ingenieur/, weights: { chefProjetEmbarque: 3, chargeMarketing: 2, medecin: 1 } },
      { label: 'Autant qu’il faut si le métier me passionne', match: /autant|longtemps|passion|10|dix|beaucoup/, weights: { medecin: 3, chefProjetEmbarque: 1 } },
    ],
  },
  {
    text: 'Qu’est-ce qui compte le plus pour toi ?',
    options: [
      { label: 'Être utile aux autres et à la planète', match: /utile|planete|environnement|autres/, weights: { medecin: 2, technicienEaux: 3 } },
      { label: 'Bien gagner ma vie', match: /gagn|argent|salaire/, weights: { chefProjetEmbarque: 2, chargeMarketing: 2, medecin: 2 } },
      { label: 'L’ambiance et les rencontres', match: /ambiance|rencontr|fete|social/, weights: { barman: 3, chargeMarketing: 1 } },
      { label: 'La liberté', match: /libert|independ/, weights: { chauffeurRoutier: 3 } },
    ],
  },
  {
    text: 'Travailler le soir, la nuit ou le week-end, ça te va ?',
    options: [
      { label: 'Oui, ça ne me dérange pas', match: /^oui|derange pas|ca va|ok/, weights: { barman: 3, chauffeurRoutier: 2, medecin: 1, technicienEaux: 1 } },
      { label: 'Je préfère des horaires de bureau', match: /^non|bureau|journee|prefere/, weights: { chefProjetEmbarque: 2, chargeMarketing: 2 } },
    ],
  },
];

function guideScores(answers, jobIds) {
  return jobIds.map(id => {
    let score = 0;
    let best = 0;
    answers.forEach((option, index) => {
      score += option.weights[id] ?? 0;
      best += Math.max(...GUIDE_QUESTIONS[index].options.map(choice => choice.weights[id] ?? 0));
    });
    return { id, percent: best ? Math.round((100 * score) / best) : 0 };
  }).sort((a, b) => b.percent - a.percent);
}

// Secteurs d'activité d'Orientation Région Sud (identifiant du site → nom), et le jeu qui s'y rattache.
const RS_SECTORS = {
  110: 'Activités juridiques et comptables', 79: 'Agriculture et élevage', 98: 'Architecture, études et normes',
  87: 'Artisanat d’art, audiovisuel et spectacle', 95: 'Automobile', 99: 'Bâtiment et travaux publics (BTP)',
  88: 'Commerce et distribution', 94: 'Communication et marketing', 82: 'Culture et patrimoine', 97: 'Édition',
  108: 'Énergie', 112: 'Enseignement et formation', 80: 'Environnement', 91: 'Finance, banque et assurance',
  103: 'Gestion administrative et ressources humaines', 102: 'Hôtellerie et restauration', 92: 'Immobilier',
  83: 'Industrie - Alimentaire', 107: 'Industrie - Bois', 106: 'Industrie - Chimie', 104: 'Industrie - Électronique',
  100: 'Industrie - Métallurgie', 89: 'Industrie - Papier et imprimerie', 90: 'Industrie - Textile et mode',
  84: 'Industries', 96: 'Informatique et télécommunication', 113: 'Logistique et transport',
  81: 'Maintenance, entretien et nettoyage', 105: 'Recherche', 85: 'Santé', 86: 'Service à la personne',
  111: 'Service public, défense et sécurité', 109: 'Social', 93: 'Sport, animation et loisir', 101: 'Tourisme',
};
const RS_SECTOR_GAMES = { 102: 'barman', 101: 'barman', 104: 'chefProjetEmbarque', 96: 'chefProjetEmbarque', 85: 'medecin', 80: 'technicienEaux', 94: 'chargeMarketing', 88: 'chargeMarketing', 113: 'chauffeurRoutier' };

/* ---------- Discussion ---------- */

let guideAnswers = [];

function askGuideQuestion() {
  const question = GUIDE_QUESTIONS[guideAnswers.length];
  say(question.text, false, $('guideLog'));
  showGuideButtons(question.options.map(option => [option.label, () => answerGuide(option, option.label)]));
}

function answerGuide(option, text) {
  say(text, true, $('guideLog'));
  guideAnswers.push(option);
  if (guideAnswers.length < GUIDE_QUESTIONS.length) askGuideQuestion();
  else showGuideResults();
}

function showGuideResults() {
  const top = guideScores(guideAnswers, Object.keys(JOBS)).slice(0, 3).map(({ id, percent }) => ({ name: JOBS[id].name, percent, job: id }));
  renderGuideResults(top, 'Merci ! D’après tes réponses, voici les métiers qui pourraient te plaire. Clique sur un métier pour le découvrir et le jouer.');
}

function renderGuideResults(top, intro) {
  say(intro, false, $('guideLog'));
  const results = document.createElement('div');
  results.className = 'guideResults';
  results.innerHTML = top.map(({ name, percent, href, job }) => {
    const content = `
      <span class="guideResultName">${name}</span>
      <span class="guideBar" aria-hidden="true"><span style="width:${percent}%"></span></span>
      <b>${percent} %</b>`;
    if (!href) return `<button type="button" class="guideResult" data-job="${job}">${content}</button>`;
    return `<div class="guideResultRow">
      <a class="guideResult" href="${href}" target="_blank" rel="noopener" title="Voir les métiers du secteur sur Orientation Région Sud (nouvel onglet)">${content}</a>
      <p class="guideWhy"></p>
      ${job ? `<button type="button" class="btn guidePlay" data-job="${job}">Jouer : ${JOBS[job].name}</button>` : ''}
    </div>`;
  }).join('');
  // Le texte de l'IA passe par textContent, jamais par innerHTML.
  results.querySelectorAll('.guideWhy').forEach((paragraph, index) => {
    paragraph.textContent = top[index].why;
    paragraph.hidden = !top[index].why;
  });
  $('guideLog').appendChild(results);
  $('guideLog').scrollTop = $('guideLog').scrollHeight;
  showGuideButtons([['Recommencer les questions', () => openGuide()]]);
}

function showGuideButtons(buttons) {
  $('guideChoices').replaceChildren(...buttons.map(([label, onClick]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn';
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  }));
}

/* ---------- Vraie IA, par le relais (relais/worker.js) ---------- */

// Adresse du relais une fois publié sur Cloudflare. Vide : le guide local répond.
const GUIDE_AI_URL = 'https://agora-guide.arijspam13000.workers.dev';
let guideHistory = null;

async function askGuideAI(text) {
  say(text, true, $('guideLog'));
  guideHistory.push({ role: 'user', content: text });
  $('guideChoices').replaceChildren();
  const waiting = document.createElement('div');
  waiting.className = 'bubble';
  waiting.textContent = '…';
  $('guideLog').appendChild(waiting);

  try {
    const response = await fetch(GUIDE_AI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: guideHistory.slice(-30) }),
    });
    if (!response.ok) throw new Error(response.status);
    const raw = await response.text();
    const reply = JSON.parse(raw);
    if (typeof reply.message !== 'string') throw new Error('réponse vide');
    waiting.remove();
    guideHistory.push({ role: 'assistant', content: raw });

    const top = (Array.isArray(reply.results) ? reply.results : [])
      .filter(result => RS_SECTORS[result?.sector])
      .map(result => ({
        name: RS_SECTORS[result.sector],
        percent: clamp(Math.round(Number(result.percent) || 0), 0, 100),
        href: `https://www.orientation-regionsud.fr/metiers?SectOpSel=${Number(result.sector)}`,
        job: RS_SECTOR_GAMES[result.sector],
        why: typeof result.why === 'string' ? result.why.slice(0, 300) : '',
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 3);
    if (top.length) return renderGuideResults(top, reply.message);

    say(reply.message, false, $('guideLog'));
    const options = (Array.isArray(reply.options) ? reply.options : []).filter(option => typeof option === 'string').slice(0, 4);
    showGuideButtons(options.map(option => [option.slice(0, 80), () => askGuideAI(option)]));
  } catch {
    // L'IA ne répond pas : le guide local prend le relais.
    waiting.remove();
    guideHistory = null;
    guideAnswers = [];
    say('Je n’arrive pas à joindre l’IA. Je te pose mes questions à la place.', false, $('guideLog'));
    askGuideQuestion();
  }
}

function openGuide(firstMessage = '') {
  guideAnswers = [];
  $('guideLog').replaceChildren();
  showScreen('guide');
  if (GUIDE_AI_URL) {
    guideHistory = [];
    return askGuideAI(firstMessage || 'Bonjour, je ne sais pas quel métier choisir.');
  }
  guideHistory = null;
  if (firstMessage) say(firstMessage, true, $('guideLog'));
  say(`Pas de souci, on va chercher ensemble ! Je vais te poser ${GUIDE_QUESTIONS.length} questions rapides. Réponds avec les boutons ou écris ta réponse.`, false, $('guideLog'));
  askGuideQuestion();
}

$('guideForm').addEventListener('submit', event => {
  event.preventDefault();
  const text = $('guideInput').value.trim();
  if (!text) return;
  $('guideInput').value = '';
  if (guideHistory) return askGuideAI(text);
  const question = GUIDE_QUESTIONS[guideAnswers.length];
  const option = question?.options.find(choice => choice.match.test(normalize(text)));
  if (option) answerGuide(option, text);
  else {
    say(text, true, $('guideLog'));
    say(question ? 'Je n’ai pas bien compris. Choisis une des réponses proposées juste en dessous.' : 'Clique sur un métier pour le découvrir, ou recommence les questions.', false, $('guideLog'));
  }
});

$('guideLog').addEventListener('click', event => {
  const result = event.target.closest('[data-job]');
  if (result) openJobInfo(result.dataset.job);
});

$('guideBack').addEventListener('click', () => showScreen('intro'));
