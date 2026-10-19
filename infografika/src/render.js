const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1200 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(root, 'ai-lapa-infografika.html'));
  await page.evaluate(() => document.fonts.ready);
  const el = await page.$('.poster');
  const box = await el.boundingBox();
  await el.screenshot({ path: path.join(root, 'ai-lapa-infografika.png') });
  await page.pdf({ path: path.join(root, 'ai-lapa-infografika.pdf'), width: '1080px',
    height: Math.ceil(box.height) + 'px', printBackground: true, pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  // mobile check
  const m = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await m.goto('file://' + path.join(root, 'ai-lapa-infografika.html'));
  await m.evaluate(() => document.fonts.ready);
  const ov = await m.evaluate(() => document.documentElement.scrollWidth);
  await m.screenshot({ path: process.argv[2] + '/mobile.png', fullPage: true });
  console.log('poster', box.width, box.height, 'mobile scrollWidth', ov);
  await browser.close();
})();
