const $ = id => document.getElementById(id);

const show = id => $(id).classList.remove('hidden');
const hide = id => $(id).classList.add('hidden');
const isVisible = id => !$(id).classList.contains('hidden');

const normalize = text => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

const euros = amount => `${amount.toLocaleString('fr-FR')} €`;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
