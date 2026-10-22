// Būvē infografiku: index.html (ar iekļautu SVG), .svg, PNG 2x un PDF.
// Palaišana: node build.mjs
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const NAME = 'ai-lapa-5-kludas';
const FONT_CSS = readFileSync(join(dir, 'fonts.css'), 'utf8');
const FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&display=swap';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1200 } });
await page.setContent(`<!doctype html><html><head><style>${FONT_CSS}</style></head>
  <body style="font-family:InterLV"><span style="font-weight:500">a</span><span style="font-weight:600">a</span><span style="font-weight:700">a</span><span style="font-weight:800">a</span><span style="font-weight:900">a</span></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.addScriptTag({ content: readFileSync(join(dir, 'builder.js'), 'utf8') });
const svg = await page.evaluate((css) => window.buildInfographic(css), FONT_CSS);
const report = await page.evaluate(() => window.__report);
console.log(report.join('\n'));

writeFileSync(join(dir, `${NAME}.svg`), svg);

const html = `<!doctype html>
<html lang="lv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI lapa: 5 kļūdas</title>
<meta name="description" content="Infografika: AI uzbūvēta lapa nav automātiski gatava lapa. 5 biežākās kļūdas un kā no tām izvairīties.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>
  :root { --bg:#07111f; --bg2:#0b1d38; --cyan:#22d3ee; --green:#34d399; --text:#eaf1fb; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, system-ui, sans-serif; }
  main { max-width: 1080px; margin: 0 auto; padding: 16px; }
  .poster { display: block; width: 100%; height: auto; border-radius: 20px; box-shadow: 0 30px 80px rgba(0,0,0,.5); }
  .poster svg { display: block; width: 100%; height: auto; }
  .bar { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; padding: 20px 0 8px; }
  .bar a, .bar button { min-height: 48px; padding: 12px 22px; border-radius: 14px; border: 1px solid rgba(34,211,238,.5);
    background: rgba(34,211,238,.1); color: var(--text); font: 600 16px/1.4 Inter, system-ui, sans-serif; text-decoration: none; cursor: pointer; }
  .bar a.primary { background: var(--green); color: #04281b; border-color: #b9ffe4; }
  .bar a:focus-visible, .bar button:focus-visible { outline: 3px solid var(--cyan); outline-offset: 3px; }
  @media print { .bar { display: none; } main { padding: 0; } .poster { box-shadow: none; border-radius: 0; } }
</style>
</head>
<body>
<main>
  <div class="poster" id="poster">
${svg}
  </div>
  <nav class="bar" aria-label="Lejupielāde">
    <a class="primary" href="${NAME}@2x.png" download>Lejupielādēt PNG (2x)</a>
    <button type="button" id="dl-svg">Lejupielādēt SVG</button>
  </nav>
</main>
<script>
  document.getElementById('dl-svg').addEventListener('click', function () {
    var s = document.querySelector('#poster svg').outerHTML;
    var url = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
    var a = document.createElement('a'); a.href = url; a.download = '${NAME}.svg';
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });
</script>
</body>
</html>
`;
writeFileSync(join(dir, 'index.html'), html);

// PNG 2x: tikai pats plakāts, precīzi 1080x2400 CSS px
const p2 = await browser.newPage({ viewport: { width: 1080, height: 2400 }, deviceScaleFactor: 2 });
await p2.setContent(`<!doctype html><html><head><link rel="stylesheet" href="${FONTS}">
  <style>html,body{margin:0;background:#07111f}svg{display:block}</style></head><body>${svg}</body></html>`);
await p2.evaluate(() => document.fonts.ready);
await p2.waitForTimeout(300);
await p2.screenshot({ path: join(dir, `${NAME}@2x.png`), clip: { x: 0, y: 0, width: 1080, height: 2400 } });
await p2.pdf({ path: join(dir, `${NAME}.pdf`), width: '1080px', height: '2400px', printBackground: true, pageRanges: '1' });

// mobilā pārbaude
const p3 = await browser.newPage({ viewport: { width: 375, height: 812 } });
await p3.goto('file://' + join(dir, 'index.html'));
await p3.evaluate(() => document.fonts.ready);
const sw = await p3.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
console.log('mobilais scrollWidth/innerWidth', sw);

await browser.close();
