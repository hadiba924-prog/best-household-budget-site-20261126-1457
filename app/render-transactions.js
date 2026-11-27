/* render-transactions.js — the Transactions page: add, filter and delete. */

function renderTransactionRow(t, showDelete) {
  const cat = budgetCategoryOf(t.category);
  const sign = t.kind === 'income' ? '+' : '−';
  const cls = t.kind === 'income' ? 'income' : 'expense';
  const catLabel = t.category === 'income' ? 'Income' : (cat ? cat.label : t.category);
  const dot = t.category === 'income' ? '#0f766e' : (cat ? cat.color : '#64748b');
  return '<li class="tx-row">' +
    '<span class="tx-dot" style="background:' + dot + '"></span>' +
    '<div class="tx-main"><strong>' + escapeHtml(t.description) + '</strong>' +
    '<span>' + formatMonthDay(t.date) + ' &middot; ' + escapeHtml(catLabel) + '</span></div>' +
    '<span class="tx-amount ' + cls + '">' + sign + formatMoney(t.amount) + '</span>' +
    (showDelete ? '<button class="tx-delete" data-delete-tx="' + t.id + '" aria-label="Delete transaction">✕</button>' : '') +
    '</li>';
}

function renderTransactions(state, activeFilter) {
  const filter = activeFilter || 'all';
  let list = state.transactions;
  if (filter === 'income') list = list.filter((t) => t.kind === 'income');
  else if (filter === 'expense') list = list.filter((t) => t.kind === 'expense');
  else if (filter !== 'all') list = list.filter((t) => t.category === filter);
  const shownSpent = list.filter((t) => t.kind === 'expense').reduce((s, t) => s + t.amount, 0);
  const shownIncome = list.filter((t) => t.kind === 'income').reduce((s, t) => s + t.amount, 0);

  const filterOptions = [{ id: 'all', label: 'All' }, { id: 'income', label: 'Income' }, { id: 'expense', label: 'Spending' }]
    .concat(BUDGET_CATEGORIES.map((c) => ({ id: c.id, label: c.label })));

  return '' +
  '<section class="page-head">' +
    '<div><p class="eyebrow">Every dollar in and out</p>' +
    '<h1>Transactions</h1>' +
    '<p class="lede">' + list.length + ' transactions in November. Income shown: ' + formatMoney(shownIncome) + ' &middot; spending shown: ' + formatMoney(shownSpent) + '.</p></div>' +
  '</section>' +

  '<section class="card">' +
    '<h2>Add a transaction</h2>' +
    '<form id="add-tx-form" class="tx-form">' +
      '<label>Date<input type="date" name="date" value="2026-11-26" required></label>' +
      '<label>Description<input type="text" name="description" placeholder="e.g. Weekly groceries" maxlength="80" required></label>' +
      '<label>Category<select name="category">' +
        '<option value="income">Income</option>' +
        BUDGET_CATEGORIES.map((c) => '<option value="' + c.id + '"' + (c.id === 'groceries' ? ' selected' : '') + '>' + escapeHtml(c.label) + '</option>').join('') +
      '</select></label>' +
      '<label>Amount ($)<input type="number" name="amount" min="0.01" step="0.01" placeholder="0.00" required></label>' +
      '<label>Type<select name="kind"><option value="expense">Spending</option><option value="income">Income</option></select></label>' +
      '<button class="button primary" type="submit">Add transaction</button>' +
    '</form>' +
    '<p class="form-note">New transactions are saved in this browser and included in every total on the site.</p>' +
  '</section>' +

  '<section class="card">' +
    '<div class="card-head"><h2>All transactions</h2><span class="card-note">' + list.length + ' shown</span></div>' +
    '<div class="filter-row" role="group" aria-label="Filter transactions">' +
      filterOptions.map((o) => '<a class="chip' + (filter === o.id ? ' active' : '') + '" href="#/transactions/' + o.id + '">' + escapeHtml(o.label) + '</a>').join('') +
    '</div>' +
    (list.length === 0
      ? '<p class="empty-note">No transactions match this filter yet.</p>'
      : '<ul class="tx-list">' + list.map((t) => renderTransactionRow(t, true)).join('') + '</ul>') +
  '</section>';
}

function bindTransactionsPage(state) {
  const form = document.getElementById('add-tx-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const amount = Number(data.get('amount'));
      const description = String(data.get('description') || '').trim();
      if (!description || !(amount > 0)) return;
      const category = String(data.get('category'));
      const kind = category === 'income' ? 'income' : String(data.get('kind'));
      budgetAddTransaction(state, {
        date: String(data.get('date')) || '2026-11-26',
        description,
        category: kind === 'income' ? 'income' : category,
        amount,
        kind,
      });
      renderCurrentPage();
    });
  }
  document.querySelectorAll('[data-delete-tx]').forEach((button) => {
    button.addEventListener('click', () => {
      budgetDeleteTransaction(state, button.getAttribute('data-delete-tx'));
      renderCurrentPage();
    });
  });
}
