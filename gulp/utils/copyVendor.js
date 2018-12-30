const fs = require('fs-extra');
const path = require('path');
const pkgDir = require('pkg-dir');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

const gulpConfig = require('../config');

/**
 * Copies vendor files from node_modules to public directory
 */
module.exports = () => {
  const modulePaths = [
    'FitVids.js/jquery.fitvids.js',
    'jquery/dist/jquery.slim.min.js',
    // 'lodash/lodash.min.js',
    'normalize-css',
    'picturefill/dist/picturefill.min.js'
    // 'react/umd',
    // 'react-dom/umd',
  ];

  return fs.removeAsync(path.join(gulpConfig.dist.vendor)).then(() =>
    Promise.mapSeries(modulePaths, modulePath => {
      const moduleName = modulePath.split('/')[0];
      const subdir = modulePath
        .split('/')
        .slice(1)
        .join('/');

      return pkgDir(require.resolve(moduleName)).then(resolvedPath => {
        const src = path.join(resolvedPath, subdir);
        const dest = path.join(gulpConfig.dist.vendor, modulePath);

        return fs.copyAsync(src, dest);
      });
    })
  );
};
