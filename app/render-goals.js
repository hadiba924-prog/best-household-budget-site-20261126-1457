/* render-goals.js — the Goals page: savings targets with progress and a
   working "add money" control for each one. */

function renderGoals(state) {
  const totalSaved = state.goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = state.goals.reduce((s, g) => s + g.target, 0);
  return '' +
  '<section class="page-head">' +
    '<div><p class="eyebrow">What you are saving toward</p>' +
    '<h1>Savings goals</h1>' +
    '<p class="lede">Four goals, ' + formatMoney(totalSaved) + ' saved toward ' + formatMoney(totalTarget) + ' in total. Add money to any goal and the progress updates everywhere on the site.</p></div>' +
  '</section>' +

  '<section class="goal-grid">' +
    state.goals.map((g) => {
      const pct = g.saved / g.target;
      const monthsLeft = Math.max(Math.ceil((g.target - g.saved) / g.monthly), 0);
      return '<article class="card goal-card">' +
        '<div class="card-head"><h2>' + escapeHtml(g.name) + '</h2><span class="goal-pct">' + formatPercent(pct) + '</span></div>' +
        chartsProgressBar(pct * 100, '#b45309', false) +
        '<p class="goal-numbers"><strong>' + formatMoney(g.saved) + '</strong> saved of ' + formatMoney(g.target) + '</p>' +
        '<p class="goal-note">' + escapeHtml(g.note) + '</p>' +
        '<p class="goal-meta">' + formatMoney(g.monthly) + ' a month &middot; ' + (monthsLeft === 0 ? 'goal reached' : 'about ' + monthsLeft + ' month' + (monthsLeft === 1 ? '' : 's') + ' to go at this pace') + '</p>' +
        '<form class="goal-form" data-goal-form="' + g.id + '">' +
          '<label>Add to this goal ($)<input type="number" name="amount" min="1" step="1" placeholder="50" required></label>' +
          '<button class="button" type="submit">Add money</button>' +
        '</form>' +
      '</article>';
    }).join('') +
  '</section>' +

  '<section class="card tip-card">' +
    '<h2>The rule that keeps the goals moving</h2>' +
    '<p>Every goal gets its monthly amount on payday, automatically, before anything else is spent. The emergency fund comes first — once it reaches $6,000, its $500 a month rolls into the vacation fund, so the coast trip arrives a season early.</p>' +
  '</section>';
}

function bindGoalsPage(state) {
  document.querySelectorAll('[data-goal-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const amount = Number(new FormData(form).get('amount'));
      if (!(amount > 0)) return;
      budgetAddToGoal(state, form.getAttribute('data-goal-form'), amount);
      renderCurrentPage();
    });
  });
}
