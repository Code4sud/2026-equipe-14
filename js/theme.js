const THEME_KEY = 'agora-theme';

function savedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

function systemTheme() {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.dispatchEvent(new Event('themechange'));
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
}

applyTheme(savedTheme() || systemTheme());

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.themeToggle').forEach(button => button.addEventListener('click', toggleTheme));
});
