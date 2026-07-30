document.addEventListener('DOMContentLoaded', () => {
  const progressFill = document.getElementById('progressBar');
const progressValue = document.getElementById('progressValue');
const loadingPercent = document.getElementById('loadingPercent');
const statusText = document.getElementById('statusText');
const statusAI = document.getElementById('statusAI');
const statusSatellite = document.getElementById('statusSatellite');
const statusDatabase = document.getElementById('statusDatabase');
const statusMission = document.getElementById('statusMission');
  const steps = [
    'Connecting secure operator channels...',
    'Loading incident intelligence...',
    'Preparing dashboard views...',
    'Redirecting to command center...'
  ];

  let stepIndex = 0;
  let width = 10;

  const tick = () => {
    if (progressFill) {
  progressFill.style.width = `${width}%`;
}

if (progressValue) {
  progressValue.textContent = `${width}%`;
}

if (loadingPercent) {
  loadingPercent.textContent = `${width}%`;
}
    if (statusText && steps[stepIndex]) {
      statusText.textContent = steps[stepIndex];
    }
if (statusAI) {
  statusAI.textContent = width >= 30 ? 'Online' : 'Initializing...';
}

if (statusSatellite) {
  statusSatellite.textContent = width >= 50 ? 'Connected' : 'Connecting...';
}

if (statusDatabase) {
  statusDatabase.textContent = width >= 70 ? 'Connected' : 'Loading...';
}

if (statusMission) {
  statusMission.textContent = width >= 100 ? 'Ready' : 'Preparing...';
}
    width = Math.min(100, width + 18);
    stepIndex = (stepIndex + 1) % steps.length;

    if (width < 100) {
      window.setTimeout(tick, 650);
    } else {
      window.setTimeout(() => {
        window.location.href = 'index.html';
      }, 400);
    }
  };

  tick();
});
