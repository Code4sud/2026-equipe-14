const ENDINGS = ['end', 'endIncident'];
const DEFAULT_LIMITS = [0, 9];

let job = null;
let state = null;
let undoStack = [];
let shownImage = null;
let illustrationRequest = 0;

function startGame(newJob = job) {
  job = newJob;
  state = { ...job.newState(), tried: [], shuffle: {} };
  undoStack = [];
  showScreen(null);
  resetChat();
  render();
  warmScenes();
}

// Pré-dessine les décors du métier pendant les temps morts : le clic suivant n'attend plus le rendu.
function warmScenes() {
  const names = Object.values(job.scenes).flatMap(scene => [scene.image, ...scene.choices.map(choice => choice.image)]);
  const queue = [...new Set(names)].filter(name => SCENES[name]);
  const idle = window.requestIdleCallback ?? (callback => setTimeout(callback, 60));
  const next = () => { if (queue.length) sceneCanvas(queue.shift()).then(() => idle(next)); };
  idle(next);
}

function choose(choice) {
  if (!choice.retry) undoStack.push(structuredClone(state));
  applyEffects(choice.effects);
  state.notes.push({ good: Boolean(choice.good), text: choice.feedback });
  state.feedback = { text: choice.feedback, good: choice.good };
  state.tried = choice.retry ? [...state.tried, choice.label] : [];
  playEffect(choice.good ? 'success' : 'alert');
  state.step = choice.next;

  const emptyGauge = job.gauges?.find(({ key }) => state[key] <= 0);
  if (emptyGauge) {
    state.step = 'endIncident';
    state.emptyGauge = emptyGauge.label;
  }

  if (ENDINGS.includes(state.step)) finish(state.step === 'endIncident');
  else render();
}

function shuffled(count) {
  const order = [...Array(count).keys()];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function applyEffects(effects) {
  for (const [key, value] of Object.entries(effects)) {
    const [min, max] = job.limits?.[key] ?? DEFAULT_LIMITS;
    if (typeof state[key] === 'number') state[key] = clamp(state[key] + value, min, max);
    else if (typeof state[key] === 'boolean') state[key] = value;
  }
}

function goBack() {
  if (!undoStack.length) return;
  state = undoStack.pop();
  showScreen(null);
  render();
}

function sceneNumber() {
  return Math.max(1, job.order.indexOf(state.step) + 1);
}

function render() {
  const scene = job.scenes[state.step];
  if (!scene) return;

  renderHud();
  showIllustration(job.image(state.step, state));

  $('title').textContent = scene.title;
  $('context').textContent = job.describe(scene, state);
  $('speaker').textContent = scene.speaker;
  $('speech').textContent = scene.line;

  state.shuffle[state.step] ??= shuffled(scene.choices.length);
  renderChoices(state.shuffle[state.step].map(index => scene.choices[index]));
  renderFeedback();
  $('backBtn').disabled = undoStack.length === 0;
}

function renderHud() {
  const finished = ENDINGS.includes(state.step);
  const progress = finished ? 1 : sceneNumber() / job.order.length;

  $('clock').textContent = job.clock(state.step, state);
  $('crowdPill').classList.toggle('hidden', !job.crowd);
  if (job.crowd) $('crowd').textContent = job.crowd(state);
  renderGauges();
  $('progress').style.width = `${Math.round(progress * 100)}%`;
}

function renderGauges(target = $('gauges')) {
  target.classList.toggle('hidden', !job.gauges);
  if (!job.gauges) return;
  target.innerHTML = job.gauges.map(({ key, label }) => {
    const value = state[key];
    return `<div class="gauge${value <= job.gaugeAlert ? ' low' : ''}">
      <span>${label}</span>
      <div class="gaugeBar" role="meter" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><div style="width:${value}%"></div></div>
      <b>${value} %</b>
    </div>`;
  }).join('');
}

function renderChoices(choices) {
  const buttons = choices.map((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.type = 'button';
    button.title = `Touche ${index + 1}`;
    button.textContent = `${index + 1}. ${choice.label}`;
    button.disabled = state.tried.includes(choice.label);
    if (choice.image) {
      const art = document.createElement('span');
      art.className = 'choiceArt';
      button.classList.add('withImage');
      button.prepend(art);
      sceneCanvas(choice.image).then(canvas => art.replaceChildren(canvas));
    }
    button.addEventListener('click', () => choose(choice));
    return button;
  });
  $('choices').replaceChildren(...buttons);
}

function renderFeedback() {
  const notice = $('notice');
  if (!state.feedback) {
    notice.className = 'notice hidden';
    return;
  }
  notice.textContent = state.feedback.text;
  notice.className = state.feedback.good ? 'notice' : 'notice bad';
}

function showIllustration(name, force = false) {
  if (name === shownImage && !force) return;
  shownImage = name;
  const request = ++illustrationRequest;
  sceneCanvas(name).then(canvas => {
    if (request === illustrationRequest) $('sceneArt').replaceChildren(canvas);
  });
}

document.addEventListener('themechange', () => {
  if (!state) return;
  if (ENDINGS.includes(state.step)) showIllustration(shownImage, true);
  else {
    render();
    showIllustration(shownImage, true);
  }
});

function finish(incident) {
  state.time = job.endTime(incident);
  const [title, description] = state.emptyGauge
    ? ['Partie perdue', `La jauge ${state.emptyGauge} est tombée à 0 % : la partie s’arrête. Reviens au dernier choix ou rejoue pour trouver un meilleur équilibre.`]
    : job.ending(state, incident);

  $('endHeading').textContent = job.endHeading;
  $('endTitle').textContent = title;
  $('endDesc').textContent = description;
  renderRecap();

  showIllustration(job.endImage(state, incident));
  renderHud();
  renderGauges($('endGauges'));
  $('askLabel').textContent = `Poser mes questions à ${job.colleague}`;
  showEndView('recap');
  showScreen('ending');
}

function renderRecap() {
  const lessons = good => [...new Set(state.notes.filter(note => note.good === good).map(note => note.text
    .replace(/^Erreur\s*:\s*/, '')
    .replace(/\s*\([+−-]\s?\d+\s?%[^)]*\)/g, '')))];
  const fill = (id, items, empty) => $(id).replaceChildren(...(items.length ? items : [empty]).map(text => {
    const item = document.createElement('li');
    item.textContent = text[0].toUpperCase() + text.slice(1);
    return item;
  }));
  fill('goodList', lessons(true), 'Aucun bon choix cette fois : rejoue pour tester d’autres réponses.');
  fill('badList', lessons(false), 'Aucune erreur : tu as fait les bons choix du début à la fin.');
}

function showEndView(view) {
  document.querySelector('#ending .modal').dataset.view = view;
  if (view === 'chat') $('chatInput').focus({ preventScroll: true });
  else $('ending').querySelector('[data-autofocus]').focus({ preventScroll: true });
}

$('askBtn').addEventListener('click', () => showEndView('chat'));
$('recapBtn').addEventListener('click', () => showEndView('recap'));
