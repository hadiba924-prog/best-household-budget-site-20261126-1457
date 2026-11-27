/* app.js — bootstrap: load the saved state, render the current page,
   re-render on every hash change, and offer a reset to the demo data. */

function budgetInitApp() {
  budgetState = budgetLoadState();
  const resetButton = document.getElementById('reset-data');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      budgetState = budgetResetState();
      renderCurrentPage();
    });
  }
  window.addEventListener('hashchange', renderCurrentPage);
  renderCurrentPage();
}

document.addEventListener('DOMContentLoaded', budgetInitApp);
