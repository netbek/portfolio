const log = require('fancy-log');
const Promise = require('bluebird');
const webpack = require('webpack');

module.exports = async (config) =>
  new Promise((resolve, reject) => {
    webpack(config, function (err, stats) {
      if (err) {
        log('[webpack]', err);
        reject();
      } else {
        log(
          '[webpack]',
          stats.toString({
            cached: false,
            cachedAssets: false,
            children: true,
            chunks: false,
            chunkModules: false,
            chunkOrigins: true,
            colors: true,
            entrypoints: false,
            errorDetails: false,
            hash: false,
            modules: false,
            performance: true,
            reasons: true,
            source: false,
            timings: true,
            version: true,
            warnings: true
          })
        );
        resolve();
      }
    });
  });
