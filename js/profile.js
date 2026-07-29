document.addEventListener('DOMContentLoaded', () => {
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.animate([
      { transform: 'translateY(8px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], { duration: 500, easing: 'ease-out' });
  }
});
