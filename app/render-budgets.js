/* render-budgets.js — the Budgets page: one limit per category, with a
   progress bar and a plain-language verdict for each. */

function renderBudgets(state) {
  const spentByCat = budgetSpentByCategory(state);
  const totalLimit = BUDGET_CATEGORIES.reduce((s, c) => s + c.limit, 0);
  const totalSpent = BUDGET_CATEGORIES.reduce((s, c) => s + spentByCat[c.id], 0);
  const rows = BUDGET_CATEGORIES.map((c) => {
    const spent = spentByCat[c.id];
    const pct = spent / c.limit;
    const left = c.limit - spent;
    const verdict = pct > 1
      ? 'Over by ' + formatMoney(-left) + ' — trim next week or move money from another category.'
      : pct >= 1
        ? 'Fully used — exactly on plan for the month.'
        : pct > 0.9
          ? 'Nearly there — ' + formatMoney(left) + ' left for the last days of the month.'
          : formatMoney(left) + ' left — on track.';
    return { category: c, spent, pct, verdict };
  });

  return '' +
  '<section class="page-head">' +
    '<div><p class="eyebrow">Limits you set for November</p>' +
    '<h1>Budgets</h1>' +
    '<p class="lede">You planned to spend ' + formatMoney(totalLimit) + ' across 11 categories. So far you have spent ' + formatMoney(totalSpent) + ' — ' + formatMoney(totalLimit - totalSpent) + ' still in the plan.</p></div>' +
  '</section>' +

  '<section class="card">' +
    '<div class="card-head"><h2>November budget plan</h2><span class="card-note">' + formatPercent(totalSpent / totalLimit) + ' of the plan used</span></div>' +
    chartsProgressBar((totalSpent / totalLimit) * 100, '#0f766e', false) +
    '<div class="budget-total-row"><span>Spent <strong>' + formatMoney(totalSpent) + '</strong></span><span>Planned <strong>' + formatMoney(totalLimit) + '</strong></span><span>Remaining <strong>' + formatMoney(totalLimit - totalSpent) + '</strong></span></div>' +
  '</section>' +

  '<section class="budget-grid">' +
    rows.map((r) =>
      '<article class="card budget-card">' +
        '<div class="budget-card-head"><span class="bar-dot" style="background:' + r.category.color + '"></span><h3>' + escapeHtml(r.category.label) + '</h3>' +
        '<span class="budget-pct">' + formatPercent(r.pct) + '</span></div>' +
        chartsProgressBar(r.pct * 100, r.category.color, r.pct > 1) +
        '<p class="budget-numbers"><strong>' + formatMoney(r.spent) + '</strong> of ' + formatMoney(r.category.limit) + '</p>' +
        '<p class="budget-verdict">' + escapeHtml(r.verdict) + '</p>' +
      '</article>').join('') +
  '</section>' +

  '<section class="card tip-card">' +
    '<h2>How the Harlowes set these limits</h2>' +
    '<p>Fixed costs (rent, insurance, internet) are set to the exact bill. Groceries and dining get a weekly allowance — $175 a week for food, split $140 groceries and $35 eating out. Everything left over after the plan goes straight to the emergency fund on the 1st, before it can be spent.</p>' +
  '</section>';
}
