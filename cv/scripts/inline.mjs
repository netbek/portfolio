/**
 * @file Inline assets in CSS
 */
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import postcssUrl from 'postcss-url';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const src = path.join(__dirname, '../dist/css/styles.css');
  const css = fs.readFileSync(src, 'utf-8');

  await postcss()
    .use(postcssUrl({url: 'inline'}))
    .process(css, {
      from: src,
      to: src
    })
    .then((result) => fs.writeFileSync(src, result.css, 'utf-8'));
})();
