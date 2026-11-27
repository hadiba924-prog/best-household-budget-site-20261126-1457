/* render-reports.js — the Reports page: spending by category and the
   six-month trend, both drawn as SVG, plus plain-language takeaways. */

function renderReports(state) {
  const spent = budgetTotalSpent(state);
  const spentByCat = budgetSpentByCategory(state);
  const rows = BUDGET_CATEGORIES
    .map((c) => ({ label: c.label, value: spentByCat[c.id], color: c.color, limit: c.limit }))
    .filter((r) => r.value > 0)
    .sort((a, b) => b.value - a.value);
  const maxValue = rows.length ? rows[0].value : 1;
  const trend = state.trend;
  const top = rows[0];
  const biggestShare = top ? top.value / spent : 0;

  return '' +
  '<section class="page-head">' +
    '<div><p class="eyebrow">Six months of household spending</p>' +
    '<h1>Reports</h1>' +
    '<p class="lede">November spending is ' + formatMoney(spent) + '. Housing is the biggest slice at ' + formatPercent(biggestShare) + ' — normal for a family of four, and the part that moves least month to month.</p></div>' +
  '</section>' +

  '<section class="card">' +
    '<div class="card-head"><h2>Spending by category — November</h2><span class="card-note">Total ' + formatMoney(spent) + '</span></div>' +
    chartsBarRows(rows, maxValue) +
  '</section>' +

  '<section class="card">' +
    '<div class="card-head"><h2>Monthly spending trend</h2><span class="card-note">Jun – Nov 2026</span></div>' +
    chartsTrendLine(trend.map((t) => ({ label: t.month, value: t.spent })), 640, 260) +
    '<p class="card-note">Spending has stayed between ' + formatMoneyShort(4180) + ' and ' + formatMoneyShort(4690) + ' a month all half-year. September was the high point — back-to-school costs — and November is back near the average.</p>' +
  '</section>' +

  '<section class="two-col">' +
    '<div class="card">' +
      '<h2>Three things this month</h2>' +
      '<ol class="takeaways">' +
        '<li><strong>Groceries ran hot.</strong> ' + formatMoney(spentByCat.groceries) + ' of a ' + formatMoney(700) + ' budget with five days left — one smaller shop and it lands on plan.</li>' +
        '<li><strong>Dining out is the flexible lever.</strong> ' + formatMoney(spentByCat.dining) + ' this month; skipping one takeaway a week frees about ' + formatMoney(240) + ' a month.</li>' +
        '<li><strong>The savings habit held.</strong> ' + formatMoney(spentByCat.savings) + ' moved to savings on the 1st, and the emergency fund is now ' + formatPercent(4350 / 6000) + ' funded.</li>' +
      '</ol>' +
    '</div>' +
    '<div class="card">' +
      '<h2>Budget vs actual</h2>' +
      '<table class="report-table"><thead><tr><th>Category</th><th>Budget</th><th>Spent</th><th>Left</th></tr></thead><tbody>' +
      BUDGET_CATEGORIES.map((c) => {
        const s = spentByCat[c.id];
        const left = c.limit - s;
        return '<tr><td>' + escapeHtml(c.label) + '</td><td>' + formatMoney(c.limit) + '</td><td>' + formatMoney(s) + '</td><td class="' + (left < 0 ? 'negative' : 'positive') + '">' + (left < 0 ? '−' : '') + formatMoney(Math.abs(left)) + '</td></tr>';
      }).join('') +
      '</tbody></table>' +
    '</div>' +
  '</section>';
}
