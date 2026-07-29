document.addEventListener('DOMContentLoaded', () => {
  const statusValue = document.getElementById('statusValue');
  if (statusValue) {
    const values = ['3.4s', '2.9s', '3.1s', '3.8s'];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % values.length;
      statusValue.textContent = values[index];
    }, 1800);
  }
});
