/* charts.js — hand-drawn SVG charts (donut, bars, trend line). No chart
   library is loaded: every chart is a few dozen lines of plain SVG. */

function chartsDonut(slices, size, thickness) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  let arcs = '';
  for (const slice of slices) {
    if (slice.value <= 0) continue;
    const frac = slice.value / total;
    const len = Math.max(frac * circumference - 2, 0.5);
    arcs += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + slice.color + '" stroke-width="' + thickness + '" stroke-dasharray="' + len.toFixed(1) + ' ' + (circumference - len).toFixed(1) + '" stroke-dashoffset="' + (-offset).toFixed(1) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')" />\n';
    offset += frac * circumference;
  }
  return '<svg viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '" role="img" aria-label="Spending by category">' + arcs + '</svg>';
}

function chartsBarRows(rows, maxValue) {
  return rows.map((row) => {
    const pct = maxValue > 0 ? Math.min((row.value / maxValue) * 100, 100) : 0;
    return '<div class="bar-row">' +
      '<div class="bar-label"><span class="bar-dot" style="background:' + row.color + '"></span>' + escapeHtml(row.label) + '</div>' +
      '<div class="bar-track"><div class="bar-fill" style="width:' + pct.toFixed(1) + '%;background:' + row.color + '"></div></div>' +
      '<div class="bar-value">' + formatMoney(row.value) + '</div>' +
      '</div>';
  }).join('\n');
}

function chartsTrendLine(points, width, height) {
  const padLeft = 8;
  const padRight = 8;
  const padTop = 18;
  const padBottom = 26;
  const max = Math.max.apply(null, points.map((p) => p.value)) * 1.08;
  const min = 0;
  const xAt = (i) => padLeft + (i * (width - padLeft - padRight)) / Math.max(points.length - 1, 1);
  const yAt = (v) => padTop + (height - padTop - padBottom) * (1 - (v - min) / (max - min));
  let line = '';
  let dots = '';
  let labels = '';
  points.forEach((p, i) => {
    const x = xAt(i);
    const y = yAt(p.value);
    line += (i === 0 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1);
    dots += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4.5" fill="#0f766e" stroke="#faf7f2" stroke-width="2" />';
    dots += '<text x="' + x.toFixed(1) + '" y="' + (y - 10).toFixed(1) + '" text-anchor="middle" class="chart-value-label">' + formatMoneyShort(p.value) + '</text>';
    labels += '<text x="' + x.toFixed(1) + '" y="' + (height - 8) + '" text-anchor="middle" class="chart-axis-label">' + escapeHtml(p.label) + '</text>';
  });
  const area = line + ' L ' + xAt(points.length - 1).toFixed(1) + ' ' + (height - padBottom) + ' L ' + xAt(0).toFixed(1) + ' ' + (height - padBottom) + ' Z';
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" width="100%" role="img" aria-label="Monthly spending trend">' +
    '<path d="' + area + '" fill="#0f766e" fill-opacity="0.10" />' +
    '<path d="' + line + '" fill="none" stroke="#0f766e" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />' +
    dots + labels + '</svg>';
}

function chartsProgressBar(pct, color, over) {
  const capped = Math.min(pct, 100);
  return '<div class="progress-track"><div class="progress-fill' + (over ? ' over' : '') + '" style="width:' + capped.toFixed(1) + '%;background:' + color + '"></div></div>';
}
