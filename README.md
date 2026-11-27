# Hearth & Ledger — Household Budget Site

[![make.fun bounty](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![make.fun rank](https://make.fun/badge/best-household-budget-site-20261126-1457/hadiba924-prog/best-household-budget-site-20261126-1457/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![make.fun reward](https://make.fun/badge/best-household-budget-site-20261126-1457/hadiba924-prog/best-household-budget-site-20261126-1457/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

A calm, working household budget site for the fictional Harlowe family —
built for the [make.fun bounty](https://make.fun/bounty/best-household-budget-site-20261126-1457).
It runs entirely offline from static files: no network requests, no
framework, no build step.

## What it does

- **Dashboard** — November at a glance: income vs spending vs what's left,
  a spending donut, budgets to watch, bills coming up, latest transactions.
- **Transactions** — add, filter by category and delete; everything is
  saved in the browser and included in every total on the site.
- **Budgets** — one limit per category with a progress bar and a
  plain-language verdict (on track, nearly there, over budget).
- **Goals** — four savings goals with progress and a working "add money"
  control for each.
- **Bills** — due dates, autopay status and a "mark paid" control.
- **Reports** — spending by category (SVG bars), a six-month trend line
  (SVG), budget-vs-actual table and three plain-language takeaways.

All figures are computed from one set of seed transactions, so the
dashboard, budgets and reports can never disagree with each other.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Or any static server with `app/` at its root. To build the entry output:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — page shell, header nav, script order
- `app/style.css` — the whole visual design
- `app/budget-data.js` — seed data, saved state, derived totals
- `app/format-money.js` — currency, date and percent formatting
- `app/charts.js` — hand-drawn SVG donut, bars and trend line
- `app/render-dashboard.js`, `render-transactions.js`,
  `app/render-budgets.js`, `app/render-goals.js`, `app/render-bills.js`,
  `app/render-reports.js` — one page each
- `app/pages.js` — hash routing between the six pages
- `app/app.js` — bootstrap
- `main.ts` — copies `app/` + `screenshots/` to the output directory and
  writes `dossier.json` with `buildDossier`
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged

## License

MIT — see [LICENSE](LICENSE).
