const autoprefixer = require('autoprefixer');
const browserslist = require('browserslist');
const esbuild = require('esbuild');
const {resolveToEsbuildTarget} = require('esbuild-plugin-browserslist');
const fs = require('fs-extra');
const globby = require('globby');
const nodeSass = require('node-sass');
const path = require('path');
const postcss = require('postcss');
const Promise = require('bluebird');

const gulpConfig = require('../config');

/**
 *
 * @param   {string} src
 * @param   {string} dest
 * @param   {string} destName
 * @returns {Promise}
 */
module.exports = async (src, dest, destName = 'app.css') => {
  const browsers = browserslist();

  const files = (await globby([src])).filter(
    (file) => !path.basename(file).startsWith('_')
  );

  let css = (
    await Promise.mapSeries(files, (file) =>
      nodeSass
        .renderSync({
          ...gulpConfig.css.params,
          file
        })
        .css.toString()
    )
  ).join('\n');

  css = (
    await postcss([autoprefixer({overrideBrowserslist: browsers})]).process(
      css,
      {
        from: undefined,
        to: dest
      }
    )
  ).css;

  const cssMin = (
    await esbuild.transform(css, {
      legalComments: 'none',
      loader: 'css',
      minify: true,
      target: resolveToEsbuildTarget(browsers, {
        printUnknownTargets: false
      })
    })
  ).code;

  await fs.outputFile(path.join(dest, destName), css, 'utf-8');

  const destNameMin = destName.replace('.css', '.min.css');

  await fs.outputFile(path.join(dest, destNameMin), cssMin, 'utf-8');
};
