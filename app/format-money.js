/* format-money.js — one place for every number, date and percent the site
   prints, so figures look the same on every page. */

function formatMoney(amount) {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatMoneyShort(amount) {
  if (amount >= 1000) return '$' + (amount / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return '$' + Math.round(amount).toLocaleString('en-US');
}

function formatPercent(value) {
  return Math.round(value * 100) + '%';
}

function formatMonthDay(isoDate) {
  const parts = isoDate.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[Number(parts[1]) - 1] || '';
  return month + ' ' + Number(parts[2]);
}

function formatFullDate(isoDate) {
  const parts = isoDate.split('-');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[Number(parts[1]) - 1] || '';
  return month + ' ' + Number(parts[2]) + ', ' + parts[0];
}

function daysUntil(isoDate, fromIsoDate) {
  const a = new Date(fromIsoDate + 'T00:00:00');
  const b = new Date(isoDate + 'T00:00:00');
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
