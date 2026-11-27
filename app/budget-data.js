/* budget-data.js — the Harlowe household's seed data and saved state.
   Every figure on the site is computed from these transactions, so the
   dashboard, budgets and reports can never disagree with each other. */

const BUDGET_STORAGE_KEY = 'hearth-ledger-state-v1';

const BUDGET_CATEGORIES = [
  { id: 'housing', label: 'Housing', color: '#0f766e', limit: 1650 },
  { id: 'groceries', label: 'Groceries', color: '#65a30d', limit: 700 },
  { id: 'utilities', label: 'Utilities', color: '#0284c7', limit: 320 },
  { id: 'transport', label: 'Transport', color: '#7c3aed', limit: 400 },
  { id: 'dining', label: 'Dining Out', color: '#ea580c', limit: 260 },
  { id: 'entertainment', label: 'Entertainment', color: '#db2777', limit: 120 },
  { id: 'health', label: 'Health', color: '#e11d48', limit: 200 },
  { id: 'kids', label: 'Kids & School', color: '#ca8a04', limit: 300 },
  { id: 'clothing', label: 'Clothing', color: '#475569', limit: 150 },
  { id: 'home', label: 'Home & Garden', color: '#059669', limit: 150 },
  { id: 'savings', label: 'Savings', color: '#b45309', limit: 500 },
];

const BUDGET_MONTH_LABEL = 'November 2026';

function budgetSeedTransactions() {
  return [
    { id: 't01', date: '2026-11-01', description: 'Monthly rent — Maplewood apartment', category: 'housing', amount: 1650.00, kind: 'expense' },
    { id: 't02', date: '2026-11-01', description: 'Salary — Maya Harlowe', category: 'income', amount: 3850.00, kind: 'income' },
    { id: 't03', date: '2026-11-01', description: 'Salary — Daniel Harlowe', category: 'income', amount: 1700.00, kind: 'income' },
    { id: 't04', date: '2026-11-01', description: 'Transfer to emergency fund', category: 'savings', amount: 500.00, kind: 'expense' },
    { id: 't05', date: '2026-11-02', description: 'Weekly groceries — Green Mart', category: 'groceries', amount: 142.60, kind: 'expense' },
    { id: 't06', date: '2026-11-02', description: 'Gym membership — FitLife', category: 'health', amount: 30.00, kind: 'expense' },
    { id: 't07', date: '2026-11-03', description: 'Fuel — Shell station', category: 'transport', amount: 48.20, kind: 'expense' },
    { id: 't08', date: '2026-11-04', description: 'Streaming — MovieBox monthly', category: 'entertainment', amount: 15.99, kind: 'expense' },
    { id: 't09', date: '2026-11-05', description: 'Electric bill — City Power', category: 'utilities', amount: 128.40, kind: 'expense' },
    { id: 't10', date: '2026-11-06', description: 'Bus passes — two kids', category: 'transport', amount: 59.50, kind: 'expense' },
    { id: 't11', date: '2026-11-06', description: 'School supplies — notebooks & pens', category: 'kids', amount: 86.40, kind: 'expense' },
    { id: 't12', date: '2026-11-07', description: 'Family dinner — Olive Garden', category: 'dining', amount: 42.80, kind: 'expense' },
    { id: 't13', date: '2026-11-08', description: 'Water bill — City Water', category: 'utilities', amount: 64.15, kind: 'expense' },
    { id: 't14', date: '2026-11-09', description: 'Weekly groceries — Green Mart', category: 'groceries', amount: 118.45, kind: 'expense' },
    { id: 't15', date: '2026-11-09', description: 'Winter jackets — kids', category: 'clothing', amount: 74.25, kind: 'expense' },
    { id: 't16', date: '2026-11-10', description: 'Pharmacy — prescriptions', category: 'health', amount: 34.60, kind: 'expense' },
    { id: 't17', date: '2026-11-11', description: 'Fuel — Shell station', category: 'transport', amount: 52.75, kind: 'expense' },
    { id: 't18', date: '2026-11-12', description: 'Internet — FiberNet monthly', category: 'utilities', amount: 79.00, kind: 'expense' },
    { id: 't19', date: '2026-11-13', description: 'Soccer season fees — Leo', category: 'kids', amount: 120.00, kind: 'expense' },
    { id: 't20', date: '2026-11-14', description: 'Tutoring — weekend maths class', category: 'income', amount: 170.00, kind: 'income' },
    { id: 't21', date: '2026-11-14', description: 'Pizza night — takeaway', category: 'dining', amount: 58.30, kind: 'expense' },
    { id: 't22', date: '2026-11-15', description: 'Car insurance — monthly premium', category: 'transport', amount: 96.00, kind: 'expense' },
    { id: 't23', date: '2026-11-15', description: 'Hardware store — shelf brackets', category: 'home', amount: 52.30, kind: 'expense' },
    { id: 't24', date: '2026-11-16', description: 'Weekly groceries — Green Mart', category: 'groceries', amount: 164.20, kind: 'expense' },
    { id: 't25', date: '2026-11-17', description: 'Dental check-up — Maya', category: 'health', amount: 89.00, kind: 'expense' },
    { id: 't26', date: '2026-11-18', description: 'School lunch money — November', category: 'kids', amount: 80.75, kind: 'expense' },
    { id: 't27', date: '2026-11-19', description: 'Fuel — Shell station', category: 'transport', amount: 61.40, kind: 'expense' },
    { id: 't28', date: '2026-11-20', description: 'Movie night — cinema tickets', category: 'entertainment', amount: 38.50, kind: 'expense' },
    { id: 't29', date: '2026-11-21', description: 'Garden plants — spring bulbs', category: 'home', amount: 65.90, kind: 'expense' },
    { id: 't30', date: '2026-11-21', description: 'Brunch — Sunny Side Cafe', category: 'dining', amount: 76.45, kind: 'expense' },
    { id: 't31', date: '2026-11-22', description: 'Books — bedtime stories', category: 'entertainment', amount: 41.75, kind: 'expense' },
    { id: 't32', date: '2026-11-23', description: 'Weekly groceries — Green Mart', category: 'groceries', amount: 186.75, kind: 'expense' },
    { id: 't33', date: '2026-11-24', description: 'Fuel — Shell station', category: 'transport', amount: 23.85, kind: 'expense' },
    { id: 't34', date: '2026-11-25', description: 'Bank interest — savings account', category: 'income', amount: 80.00, kind: 'income' },
    { id: 't35', date: '2026-11-25', description: 'Takeaway — Thai Orchid', category: 'dining', amount: 60.10, kind: 'expense' },
  ];
}

function budgetSeedGoals() {
  return [
    { id: 'g1', name: 'Emergency fund', note: 'Six months of essentials, kept in a high-yield savings account.', target: 6000, saved: 4350, monthly: 500 },
    { id: 'g2', name: 'Family vacation', note: 'A week at the coast next summer — flights, cabin and food.', target: 2400, saved: 1180, monthly: 200 },
    { id: 'g3', name: 'New car down payment', note: 'Replacing the 2012 sedan before it needs another big repair.', target: 8000, saved: 2900, monthly: 350 },
    { id: 'g4', name: 'Kids college fund', note: 'Started small for Leo and June; every birthday gift adds a little.', target: 12000, saved: 1450, monthly: 150 },
  ];
}

function budgetSeedBills() {
  return [
    { id: 'b1', name: 'Rent — Maplewood apartment', amount: 1650, due: '2026-12-01', status: 'scheduled', autopay: true },
    { id: 'b2', name: 'Gym membership — FitLife', amount: 30, due: '2026-12-02', status: 'scheduled', autopay: true },
    { id: 'b3', name: 'Streaming — MovieBox', amount: 15.99, due: '2026-12-04', status: 'scheduled', autopay: true },
    { id: 'b4', name: 'Electric — City Power', amount: 130, due: '2026-12-05', status: 'due soon', autopay: false },
    { id: 'b5', name: 'Water — City Water', amount: 65, due: '2026-12-08', status: 'due soon', autopay: false },
    { id: 'b6', name: 'Internet — FiberNet', amount: 79, due: '2026-12-10', status: 'due soon', autopay: true },
    { id: 'b7', name: 'Car insurance — monthly premium', amount: 96, due: '2026-12-15', status: 'upcoming', autopay: true },
    { id: 'b8', name: 'Phone plan — two lines', amount: 88, due: '2026-12-18', status: 'upcoming', autopay: true },
  ];
}

function budgetSeedMonthlyTrend() {
  return [
    { month: 'Jun', spent: 4180 },
    { month: 'Jul', spent: 4520 },
    { month: 'Aug', spent: 4310 },
    { month: 'Sep', spent: 4690 },
    { month: 'Oct', spent: 4455 },
    { month: 'Nov', spent: 4342 },
  ];
}

function budgetDefaultState() {
  return {
    transactions: budgetSeedTransactions(),
    goals: budgetSeedGoals(),
    bills: budgetSeedBills(),
    trend: budgetSeedMonthlyTrend(),
  };
}

function budgetLoadState() {
  try {
    const raw = window.localStorage.getItem(BUDGET_STORAGE_KEY);
    if (!raw) return budgetDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.transactions)) return budgetDefaultState();
    return parsed;
  } catch (err) {
    return budgetDefaultState();
  }
}

function budgetSaveState(state) {
  try {
    window.localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    /* Storage unavailable (private mode, hosted preview): the site keeps
       working in memory for the session. */
  }
}

function budgetResetState() {
  try { window.localStorage.removeItem(BUDGET_STORAGE_KEY); } catch (err) {}
  return budgetDefaultState();
}

/* --- Derived figures, always computed from the transactions --- */

function budgetCategoryOf(id) {
  return BUDGET_CATEGORIES.find((c) => c.id === id) || null;
}

function budgetTotalIncome(state) {
  return state.transactions
    .filter((t) => t.kind === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

function budgetTotalSpent(state) {
  return state.transactions
    .filter((t) => t.kind === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

function budgetSpentByCategory(state) {
  const spent = {};
  for (const c of BUDGET_CATEGORIES) spent[c.id] = 0;
  for (const t of state.transactions) {
    if (t.kind === 'expense' && Object.prototype.hasOwnProperty.call(spent, t.category)) {
      spent[t.category] += t.amount;
    }
  }
  return spent;
}

function budgetUpcomingBills(state) {
  return state.bills.filter((b) => b.status !== 'paid');
}

function budgetAddTransaction(state, fields) {
  const tx = {
    id: 't' + Date.now().toString(36),
    date: fields.date,
    description: fields.description,
    category: fields.category,
    amount: Math.round(fields.amount * 100) / 100,
    kind: fields.kind,
  };
  state.transactions.push(tx);
  state.transactions.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  budgetSaveState(state);
  return tx;
}

function budgetDeleteTransaction(state, id) {
  state.transactions = state.transactions.filter((t) => t.id !== id);
  budgetSaveState(state);
}

function budgetAddToGoal(state, goalId, amount) {
  const goal = state.goals.find((g) => g.id === goalId);
  if (!goal) return null;
  goal.saved = Math.round((goal.saved + amount) * 100) / 100;
  budgetSaveState(state);
  return goal;
}

function budgetMarkBillPaid(state, billId) {
  const bill = state.bills.find((b) => b.id === billId);
  if (!bill) return null;
  bill.status = 'paid';
  budgetSaveState(state);
  return bill;
}
