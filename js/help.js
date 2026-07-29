document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.help-item');
  items.forEach((item, index) => {
    item.animate([
      { transform: 'translateY(8px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 420 + index * 120, easing: 'ease-out' });
  });
});
