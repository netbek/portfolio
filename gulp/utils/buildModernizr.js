const fs = require('fs-extra');
const modernizr = require('modernizr');
const path = require('path');
const Promise = require('bluebird');
const buildJs = require('./buildJs');
const gulpConfig = require('../config');
const webpackConfigProd = require('../../webpack.config.prod');

module.exports = async () => {
  const data =
    (await new Promise(function (resolve) {
      modernizr.build(gulpConfig.modernizr, (result) => {
        resolve(result);
      });
    })) +
    '\n' +
    (await fs.readFile(
      path.join(gulpConfig.src.vendor, 'modernizr/modernizr.js'),
      'utf-8'
    ));

  await fs.outputFile(
    path.join(gulpConfig.dist.vendor, 'modernizr/modernizr.js'),
    data,
    'utf-8'
  );

  await buildJs({
    ...webpackConfigProd,
    entry: {
      'modernizr.min': path.resolve(
        gulpConfig.dist.vendor,
        'modernizr/modernizr.js'
      )
    },
    output: {
      filename: '[name].js',
      path: path.resolve(gulpConfig.dist.vendor, 'modernizr')
    }
  });

  await fs.remove(path.join(gulpConfig.dist.vendor, 'modernizr/modernizr.js'));
};
