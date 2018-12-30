const fs = require('fs-extra');
const path = require('path');
const pkgDir = require('pkg-dir');
const Promise = require('bluebird');
const gulpConfig = require('../config');

Promise.promisifyAll(fs);

const MODULES_PATH = path.join(__dirname, '../../node_modules');

function getModuleDir(moduleName, modulePath) {
  let module;

  try {
    module = require.resolve(moduleName);
  } catch (err) {
    return fs
      .exists(path.join(MODULES_PATH, modulePath))
      .then(exists =>
        exists
          ? Promise.resolve(path.join(MODULES_PATH, moduleName))
          : Promise.reject()
      );
  }

  return pkgDir(module);
}

/**
 * Copies vendor files from node_modules to public directory
 */
module.exports = () =>
  Promise.mapSeries(gulpConfig.vendor.modulePaths, modulePath => {
    const pathSegments = modulePath.split(path.sep);
    const moduleName = pathSegments[0];

    return getModuleDir(moduleName, modulePath).then(moduleDir => {
      const src = path.join(moduleDir, pathSegments.slice(1).join(path.sep));
      const dest = path.join(gulpConfig.dist.vendor, modulePath);

      return fs.copyAsync(src, dest);
    });
  });
