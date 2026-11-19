/* Musique de fond et effets sonores.
   En ligne (http), la musique passe par Web Audio pour boucler sans aucun blanc.
   Ouvert en fichier local, le navigateur interdit ce chargement : on revient à <audio loop>. */

const MUSIC_VOLUME = 0.35;
const EFFECT_VOLUME = 0.8;
const FADE_SECONDS = 0.8;
const GAPLESS = location.protocol.startsWith('http') && 'AudioContext' in window;

const EFFECTS = {
  click: new Audio('assets/sons/clic-doux.wav'),
  success: new Audio('assets/sons/confirmation-reussie.wav'),
  alert: new Audio('assets/sons/alerte-douce.wav'),
};

const musicElement = $('music');
const decodedTracks = new Map();
let soundOn = true;
let musicWanted = false;
let track = 'hotellerie';
let context = null;
let musicGain = null;
let musicSource = null;
let musicRequest = 0;

const trackUrl = name => `assets/music/${name}.m4a`;

function audioContext() {
  if (!context) {
    context = new AudioContext();
    musicGain = context.createGain();
    musicGain.connect(context.destination);
  }
  return context;
}

function decodeTrack(name) {
  if (!decodedTracks.has(name)) {
    decodedTracks.set(name, fetch(trackUrl(name))
      .then(response => response.arrayBuffer())
      .then(data => audioContext().decodeAudioData(data)));
  }
  return decodedTracks.get(name);
}

function stopSource() {
  musicSource?.stop();
  musicSource = null;
}

async function startGapless() {
  const request = ++musicRequest;
  await audioContext().resume();
  const buffer = await decodeTrack(track);
  if (request !== musicRequest || !musicWanted || !soundOn) return;

  stopSource();
  musicSource = context.createBufferSource();
  musicSource.buffer = buffer;
  musicSource.loop = true;
  musicSource.connect(musicGain);
  musicGain.gain.setValueAtTime(0, context.currentTime);
  musicGain.gain.linearRampToValueAtTime(MUSIC_VOLUME, context.currentTime + FADE_SECONDS);
  musicSource.start();
}

function startElement() {
  musicElement.volume = MUSIC_VOLUME;
  if (!musicElement.src.endsWith(trackUrl(track))) musicElement.src = trackUrl(track);
  return musicElement.play();
}

function startMusic() {
  musicWanted = true;
  if (!soundOn) return;
  const started = GAPLESS ? startGapless() : startElement();
  started.catch(() => setSound(false));
}

function pauseMusic() {
  musicRequest++;
  stopSource();
  musicElement.pause();
}

function stopMusic() {
  musicWanted = false;
  pauseMusic();
}

function chooseTrack(name) {
  track = name;
  if (musicWanted && soundOn) {
    pauseMusic();
    startMusic();
  }
}

function setSound(on) {
  soundOn = on;
  $('musicLabel').textContent = on ? 'Son : ON' : 'Son : OFF';
  if (on && musicWanted) startMusic();
  else if (!on) pauseMusic();
}

function playEffect(name) {
  if (!soundOn) return;
  const effect = EFFECTS[name].cloneNode();
  effect.volume = EFFECT_VOLUME;
  effect.play().catch(() => {});
}

$('musicBtn').addEventListener('click', () => setSound(!soundOn));

document.addEventListener('visibilitychange', () => {
  if (!musicWanted || !soundOn) return;
  if (document.hidden) {
    context?.suspend();
    musicElement.pause();
  } else if (GAPLESS) {
    context?.resume();
  } else {
    musicElement.play().catch(() => {});
  }
});

document.addEventListener('click', event => {
  if (event.target.closest('.stage button, #ending button') && !event.target.closest('.choice')) playEffect('click');
});
