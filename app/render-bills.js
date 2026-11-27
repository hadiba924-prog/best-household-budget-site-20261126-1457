/* render-bills.js — the Bills page: what is due, when, and a working
   "mark paid" control. "Today" is fixed to the last day the data covers
   (Nov 26, 2026) so the due-soon flags never drift. */

const BILLS_TODAY = '2026-11-26';

function renderBills(state) {
  const upcoming = budgetUpcomingBills(state);
  const paid = state.bills.filter((b) => b.status === 'paid');
  const totalDue = upcoming.reduce((s, b) => s + b.amount, 0);
  const statusLabel = (b) => {
    if (b.status === 'paid') return 'Paid';
    if (b.status === 'scheduled') return 'Scheduled';
    if (b.status === 'due soon') return 'Due soon';
    return 'Upcoming';
  };
  const row = (b) => {
    const days = daysUntil(b.due, BILLS_TODAY);
    const when = days <= 0 ? 'due today' : 'in ' + days + ' day' + (days === 1 ? '' : 's');
    return '<li class="bill-row">' +
      '<div class="bill-main"><strong>' + escapeHtml(b.name) + '</strong>' +
      '<span>Due ' + formatFullDate(b.due) + ' (' + when + ') &middot; ' + (b.autopay ? 'autopay on' : 'pay manually') + '</span></div>' +
      '<span class="bill-amount">' + formatMoney(b.amount) + '</span>' +
      '<span class="bill-status ' + b.status + '">' + statusLabel(b) + '</span>' +
      (b.status !== 'paid' ? '<button class="button small" data-pay-bill="' + b.id + '">Mark paid</button>' : '') +
      '</li>';
  };

  return '' +
  '<section class="page-head">' +
    '<div><p class="eyebrow">Nothing slips through the cracks</p>' +
    '<h1>Bills &amp; reminders</h1>' +
    '<p class="lede">' + upcoming.length + ' bills still to pay before Dec 20, totalling ' + formatMoney(totalDue) + '. The electric and water bills need paying by hand — the rest run on autopay.</p></div>' +
  '</section>' +

  '<section class="card">' +
    '<div class="card-head"><h2>Coming up</h2><span class="card-note">' + formatMoney(totalDue) + ' due</span></div>' +
    (upcoming.length === 0
      ? '<p class="empty-note">All caught up — no bills left to pay this cycle.</p>'
      : '<ul class="bill-list full">' + upcoming.map(row).join('') + '</ul>') +
  '</section>' +

  (paid.length > 0 ?
  '<section class="card">' +
    '<div class="card-head"><h2>Paid</h2><span class="card-note">' + paid.length + ' paid</span></div>' +
    '<ul class="bill-list full">' + paid.map(row).join('') + '</ul>' +
  '</section>' : '') +

  '<section class="card tip-card">' +
    '<h2>How the Harlowes never miss a bill</h2>' +
    '<p>Every bill lives here the day it arrives, with its due date and whether autopay covers it. Anything due within five days shows as “Due soon” on the dashboard, and the two bills without autopay are paid the same morning they appear — never on the due date itself.</p>' +
  '</section>';
}

function bindBillsPage(state) {
  document.querySelectorAll('[data-pay-bill]').forEach((button) => {
    button.addEventListener('click', () => {
      budgetMarkBillPaid(state, button.getAttribute('data-pay-bill'));
      renderCurrentPage();
    });
  });
}
