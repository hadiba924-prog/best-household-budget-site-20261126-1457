/* render-dashboard.js — the Dashboard page: the month at a glance. */

function renderDashboard(state) {
  const income = budgetTotalIncome(state);
  const spent = budgetTotalSpent(state);
  const remaining = income - spent;
  const savingsRate = income > 0 ? remaining / income : 0;
  const spentByCat = budgetSpentByCategory(state);
  const slices = BUDGET_CATEGORIES
    .filter((c) => c.id !== 'savings')
    .map((c) => ({ label: c.label, value: spentByCat[c.id], color: c.color }))
    .filter((s) => s.value > 0)
    .sort((a, b) => b.value - a.value);
  const topBudgets = BUDGET_CATEGORIES
    .map((c) => ({ category: c, spent: spentByCat[c.id] }))
    .sort((a, b) => (b.spent / b.category.limit) - (a.spent / a.category.limit))
    .slice(0, 4);
  const upcoming = budgetUpcomingBills(state).slice(0, 4);
  const recent = state.transactions.slice(0, 5);
  const topGoal = state.goals.slice().sort((a, b) => (b.saved / b.target) - (a.saved / a.target))[0];

  return '' +
  '<section class="page-head">' +
    '<div><p class="eyebrow">The Harlowe Household &middot; ' + BUDGET_MONTH_LABEL + '</p>' +
    '<h1>Your money, in one calm place.</h1>' +
    '<p class="lede">Income, spending, budgets, bills and goals for November — updated through Nov 26.</p></div>' +
    '<a class="button primary" href="#/transactions">+ Add a transaction</a>' +
  '</section>' +

  '<section class="stat-grid">' +
    '<div class="stat-card income"><span class="stat-label">Income this month</span><span class="stat-value">' + formatMoney(income) + '</span><span class="stat-note">2 salaries + tutoring + interest</span></div>' +
    '<div class="stat-card spent"><span class="stat-label">Spent so far</span><span class="stat-value">' + formatMoney(spent) + '</span><span class="stat-note">' + formatPercent(spent / income) + ' of income</span></div>' +
    '<div class="stat-card left"><span class="stat-label">Left to spend &amp; save</span><span class="stat-value">' + formatMoney(remaining) + '</span><span class="stat-note">Savings rate ' + formatPercent(savingsRate) + '</span></div>' +
    '<div class="stat-card goal"><span class="stat-label">Closest goal</span><span class="stat-value">' + escapeHtml(topGoal.name) + '</span><span class="stat-note">' + formatMoney(topGoal.saved) + ' of ' + formatMoney(topGoal.target) + ' (' + formatPercent(topGoal.saved / topGoal.target) + ')</span></div>' +
  '</section>' +

  '<section class="two-col">' +
    '<div class="card">' +
      '<div class="card-head"><h2>Where the money went</h2><a class="card-link" href="#/reports">Full report &rarr;</a></div>' +
      '<div class="donut-wrap">' + chartsDonut(slices, 190, 30) +
        '<div class="donut-center"><span class="donut-total">' + formatMoney(spent) + '</span><span class="donut-caption">spent in November</span></div>' +
      '</div>' +
      '<ul class="legend">' + slices.slice(0, 6).map((s) =>
        '<li><span class="bar-dot" style="background:' + s.color + '"></span>' + escapeHtml(s.label) +
        '<strong>' + formatMoney(s.value) + '</strong><span class="legend-pct">' + formatPercent(s.value / spent) + '</span></li>').join('') + '</ul>' +
    '</div>' +

    '<div class="card">' +
      '<div class="card-head"><h2>Budgets to watch</h2><a class="card-link" href="#/budgets">All budgets &rarr;</a></div>' +
      topBudgets.map((b) => {
        const pct = b.spent / b.category.limit;
        return '<div class="budget-line"><div class="budget-line-top"><span>' + escapeHtml(b.category.label) + '</span><span><strong>' + formatMoney(b.spent) + '</strong> of ' + formatMoney(b.category.limit) + '</span></div>' +
          chartsProgressBar(pct * 100, b.category.color, pct > 1) +
          '<div class="budget-line-note">' + (pct > 1 ? 'Over budget by ' + formatMoney(b.spent - b.category.limit) : formatPercent(pct) + ' used &middot; ' + formatMoney(b.category.limit - b.spent) + ' left') + '</div></div>';
      }).join('') +
      '<p class="card-tip">Tip: groceries are the easiest win this month — a $20 weekly shop saves about $80 by December.</p>' +
    '</div>' +
  '</section>' +

  '<section class="two-col">' +
    '<div class="card">' +
      '<div class="card-head"><h2>Bills coming up</h2><a class="card-link" href="#/bills">All bills &rarr;</a></div>' +
      '<ul class="bill-list">' + upcoming.map((b) =>
        '<li><div><strong>' + escapeHtml(b.name) + '</strong><span>Due ' + formatFullDate(b.due) + (b.autopay ? ' &middot; autopay on' : ' &middot; pay manually') + '</span></div>' +
        '<span class="bill-amount">' + formatMoney(b.amount) + '</span></li>').join('') + '</ul>' +
      '<p class="card-note">Total due before Dec 20: <strong>' + formatMoney(upcoming.reduce((s, b) => s + b.amount, 0)) + '</strong></p>' +
    '</div>' +

    '<div class="card">' +
      '<div class="card-head"><h2>Latest transactions</h2><a class="card-link" href="#/transactions">See all &rarr;</a></div>' +
      '<ul class="tx-list compact">' + recent.map((t) => renderTransactionRow(t, false)).join('') + '</ul>' +
    '</div>' +
  '</section>';
}
