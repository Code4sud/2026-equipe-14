const ADVICE_REQUEST = /quoi faire|que faire|aide|conseil|maintenant|scene/;

function answer(question) {
  const text = normalize(question);

  if (ADVICE_REQUEST.test(text)) return job.advice[state.step] || job.defaultAdvice;

  const rule = job.answers.find(({ match }) => match.test(text));
  if (!rule) return job.fallback;
  return typeof rule.reply === 'function' ? rule.reply(state) : rule.reply;
}

function say(text, fromPlayer = false, log = $('chatLog')) {
  const bubble = document.createElement('div');
  bubble.className = fromPlayer ? 'bubble you' : 'bubble';
  bubble.textContent = text;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
}

let chatHistory = [];

// Ce que le collègue sait : la fiche du métier et le bilan de la partie.
function chatContext() {
  const { info } = job;
  const notes = good => state.notes.filter(note => note.good === good).map(note => note.text).join(' ; ') || 'rien';
  return [
    `Métier : ${job.name}. Tu es ${job.colleague}, ${job.colleagueRole ?? 'collègue du joueur'}.`,
    `Le métier : ${info.summary}`,
    `Missions : ${info.missions.join(' ; ')}`,
    `Qualités : ${info.qualities.join(' ; ')}`,
    `Formation : ${info.studies.join(' ; ')}`,
    `Conditions : ${info.conditions.join(' ; ')}`,
    `Salaire médian : ${euros(info.salary.median)} net par mois (Insee 2022, via Orientation Région Sud).`,
    `Fin de la partie : ${$('endTitle').textContent}.`,
    `Bien fait : ${notes(true)}`,
    `À éviter : ${notes(false)}`,
  ].join('\n').slice(0, 3000);
}

async function aiAnswer(question) {
  chatHistory.push({ role: 'user', content: question });
  const response = await fetch(GUIDE_AI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'collegue', context: chatContext(), messages: chatHistory.slice(-20) }),
  });
  if (!response.ok) throw new Error(response.status);
  const { message } = await response.json();
  if (typeof message !== 'string' || !message) throw new Error('réponse vide');
  chatHistory.push({ role: 'assistant', content: message });
  return message;
}

function resetChat() {
  chatHistory = [];
  $('chatTitle').textContent = `${job.colleague}, ${job.colleagueRole ?? 'ton collègue'}`;
  $('chatSubtitle').textContent = job.chatSubtitle;
  $('chatInput').placeholder = `Pose ta question à ${job.colleague}…`;
  $('journalTitle').textContent = job.journalTitle;
  $('chatLog').replaceChildren();
  say(job.greeting);
}

$('chatForm').addEventListener('submit', event => {
  event.preventDefault();
  const input = $('chatInput');
  const question = input.value.trim();
  if (!question) return;

  say(question, true);
  input.value = '';
  if (!GUIDE_AI_URL) return say(answer(question));

  const waiting = document.createElement('div');
  waiting.className = 'bubble';
  waiting.textContent = '…';
  $('chatLog').appendChild(waiting);
  aiAnswer(question)
    .then(reply => say(reply))
    // L'IA ne répond pas : les réponses préparées prennent le relais.
    .catch(() => {
      chatHistory.pop();
      say(answer(question));
    })
    .finally(() => waiting.remove());
});
