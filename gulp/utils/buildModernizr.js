const fs = require('fs-extra');
const modernizr = require('modernizr');
const path = require('path');
const Promise = require('bluebird');
const buildJs = require('./buildJs');
const gulpConfig = require('../config');
const webpackConfigProd = require('../../webpack.config.prod');

Promise.promisifyAll(fs);

module.exports = () =>
  new Promise(function(resolve) {
    modernizr.build(gulpConfig.modernizr, result => {
      resolve(result);
    });
  })
    .then(data =>
      fs.outputFileAsync(
        path.join(gulpConfig.dist.vendor, 'modernizr/modernizr.js'),
        data,
        'utf-8'
      )
    )
    .then(() =>
      buildJs({
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
      })
    );
