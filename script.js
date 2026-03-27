const APK_URL = 'https://github.com/crldnglsn-dev/simove/releases/download/v1.1.0/SIMOVE-v1.1.0.apk';
const COUNTER_SLUG = 'simove-v110-crldnglsn';
const API_BASE = `https://counterapi.dev/api/${COUNTER_SLUG}`;

async function loadCount() {
  try {
    const res = await fetch(`${API_BASE}/get`);
    const data = await res.json();
    setCount(data.value ?? 0);
  } catch (err) {
    console.error('Failed to load count from CounterAPI', err);
    setCount(0);
  }
}

function setCount(n) {
  const formatted = Number(n).toLocaleString();
  document.getElementById('dlCount').textContent = formatted;
  document.getElementById('statDownloads').textContent = formatted;
}

async function handleDownload() {
  const a = document.createElement('a');
  a.href = APK_URL;
  a.download = 'SIMOVE-v1.1.0.apk';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  try {
    const res = await fetch(`${API_BASE}/hit`, { method: 'POST' });
    const data = await res.json();
    setCount(data.value ?? 0);
  } catch (err) {
    console.error('Failed to increment count on CounterAPI', err);
    const n = parseInt(localStorage.getItem('simove_dl') || '0') + 1;
    localStorage.setItem('simove_dl', n);
    setCount(n);
  }

  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// Load download count on page load
loadCount();
