document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.settings-card');
  cards.forEach((card, index) => {
    card.animate([
      { transform: 'translateY(10px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 420 + index * 120, easing: 'ease-out' });
  });
});
