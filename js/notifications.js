document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.notify-item');
  items.forEach((item, index) => {
    item.animate([
      { transform: 'translateX(10px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ], { duration: 420 + index * 120, easing: 'ease-out' });
  });
});
