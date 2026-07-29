document.addEventListener('DOMContentLoaded', () => {
  const progressFill = document.getElementById('progressFill');
  const statusText = document.getElementById('statusText');
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
    if (statusText && steps[stepIndex]) {
      statusText.textContent = steps[stepIndex];
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
