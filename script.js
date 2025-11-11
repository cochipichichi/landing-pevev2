const qs = (s, x=document) => x.querySelector(s);
const qsa = (s, x=document) => Array.from(x.querySelectorAll(s));

// Theme toggle
const themeBtn = qs('#btn-theme');
let theme = localStorage.getItem('peve_theme') || 'dark';
const applyTheme = () => {
  if (theme === 'light') document.documentElement.style.setProperty('--bg', '#f7fafc');
  if (theme === 'light') document.documentElement.style.setProperty('--fg', '#0b1220');
  if (theme === 'light') document.body.style.background = 'var(--bg)';
  if (theme === 'dark') document.documentElement.style.setProperty('--bg', '#0b1220');
  if (theme === 'dark') document.documentElement.style.setProperty('--fg', '#e6eefc');
};
applyTheme();
themeBtn?.addEventListener('click', () => {
  theme = (theme === 'dark' ? 'light' : 'dark');
  localStorage.setItem('peve_theme', theme);
  applyTheme();
});

// Font size controls
let baseSize = Number(localStorage.getItem('peve_font') || 16);
const setSize = () => document.documentElement.style.fontSize = baseSize + 'px';
setSize();
qs('#btn-plus')?.addEventListener('click', () => { baseSize = Math.min(baseSize+1, 22); localStorage.setItem('peve_font', baseSize); setSize(); });
qs('#btn-minus')?.addEventListener('click', () => { baseSize = Math.max(baseSize-1, 12); localStorage.setItem('peve_font', baseSize); setSize(); });

// Narrator (speech synthesis) — reads selected text or hero summary
qs('#btn-tts')?.addEventListener('click', () => {
  const sel = String(window.getSelection());
  const text = sel || qs('#hero-summary')?.innerText || 'PEVE. Plataforma de Exámenes de Validación de Estudios.';
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-CL';
    window.speechSynthesis.speak(u);
  } else {
    alert('Narrador no disponible en este navegador.');
  }
});

// Simple search over cards
qs('#search')?.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  qsa('.card').forEach(card => {
    const hay = card.innerText.toLowerCase().includes(q);
    card.classList.toggle('hidden', !hay);
  });
});

// Register SW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(console.warn);
}