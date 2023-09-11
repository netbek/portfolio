/**
 * @file Generate PDF from HTML
 */
import path from 'path';
import puppeteer from 'puppeteer';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function toPdf(src, dest) {
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  const page = await browser.newPage();

  await page.goto('file://' + path.resolve(src), {waitUntil: 'load'});

  await page.emulateMediaType('print');

  await page.pdf({
    pageRanges: '1,2,3',
    path: dest,
    preferCSSPageSize: true,
    printBackground: true
  });

  await browser.close();
}

(async () => {
  const src = path.join(__dirname, '../dist/index.html');
  const dest = path.join(__dirname, '../../public/hein-bekker-cv.pdf');

  await toPdf(src, dest);
})();
