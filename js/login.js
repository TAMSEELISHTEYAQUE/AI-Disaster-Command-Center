document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = 'loading.html';
    });
  }
});
