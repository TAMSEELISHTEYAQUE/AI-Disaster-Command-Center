document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      sessionStorage.setItem("loggedIn", "true");
window.location.href = "loading.html";
    });
  }
});
