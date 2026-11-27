/* pages.js — hash routing: one page per section, every section reached
   by a link in the header. */

const BUDGET_PAGES = [
  { route: '', label: 'Dashboard', render: renderDashboard },
  { route: 'transactions', label: 'Transactions', render: renderTransactions },
  { route: 'budgets', label: 'Budgets', render: renderBudgets },
  { route: 'goals', label: 'Goals', render: renderGoals },
  { route: 'bills', label: 'Bills', render: renderBills },
  { route: 'reports', label: 'Reports', render: renderReports },
];

let budgetState = null;

function budgetCurrentRoute() {
  const hash = window.location.hash || '#/';
  const parts = hash.replace(/^#\/?/, '').split('/');
  return { page: parts[0] || '', param: parts[1] || null };
}

function renderCurrentPage() {
  const view = document.getElementById('view');
  if (!view || !budgetState) return;
  const route = budgetCurrentRoute();
  const page = BUDGET_PAGES.find((p) => p.route === route.page) || BUDGET_PAGES[0];
  view.innerHTML = page.render(budgetState, route.param);
  if (page.route === 'transactions') bindTransactionsPage(budgetState);
  if (page.route === 'goals') bindGoalsPage(budgetState);
  if (page.route === 'bills') bindBillsPage(budgetState);
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const target = link.getAttribute('href');
    const isActive = (page.route === '' && target === '#/') || target === '#/' + page.route;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}
