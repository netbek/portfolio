const fs = require('fs-extra');
const path = require('path');
const pkgDir = require('pkg-dir');
const Promise = require('bluebird');
const gulpConfig = require('../config');

const MODULES_PATH = path.join(__dirname, '../../node_modules');

function getModuleDir(moduleName, modulePath) {
  let module;

  try {
    // If package has a manifest
    module = require.resolve(moduleName);
  } catch (err) {
    // If package doesn't have a manifest
    return fs
      .exists(path.join(MODULES_PATH, modulePath))
      .then((exists) =>
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
module.exports = async () =>
  Promise.mapSeries(gulpConfig.vendor.paths, (vendorPath) => {
    const pathSegments = vendorPath.split(path.sep);
    const moduleName = pathSegments[0];

    return getModuleDir(moduleName, vendorPath).then((moduleDir) => {
      const src = path.join(moduleDir, pathSegments.slice(1).join(path.sep));
      const dest = path.join(gulpConfig.dist.vendor, vendorPath);

      return fs.copy(src, dest);
    });
  });
