// Fills in the farmer's name in the top bar and wires up logout buttons.
// Include after supabase-client.js and data.js on every logged-in page.

document.addEventListener('DOMContentLoaded', () => {
  const farmer = qsCurrentFarmer();
  const nameSlots = document.querySelectorAll('[data-farmer-name]');
  nameSlots.forEach(el => { el.textContent = farmer ? farmer.name : 'Farmer'; });

  document.querySelectorAll('.js-logout').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      qsLogout();
    });
  });
});
