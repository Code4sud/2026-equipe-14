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

function resetChat() {
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
  say(answer(question));
  input.value = '';
});
