const cheerio = require('cheerio');
const fs = require('fs-extra');
const globPromise = require('glob-promise');
const path = require('path');
const Promise = require('bluebird');
const SVGO = require('svgo');
const gulpConfig = require('../config');

Promise.promisifyAll(fs);

const svgo = new SVGO();

module.exports = () =>
  globPromise(path.join(gulpConfig.src.svg, 'icons', '*.svg')).then((files) =>
    Promise.mapSeries(files, (file) =>
      fs
        .readFileAsync(file, 'utf-8')
        .then((data) => {
          const basename = path.basename(file, path.extname(file));

          const $ = cheerio.load(data, {
            xmlMode: true
          });

          // Remove fill attribute from all nodes
          $('[fill]').removeAttr('fill');

          // Add viewBox attribute if none
          const width = parseFloat($('svg').attr('width') || 0);
          const height = parseFloat($('svg').attr('height') || 0);
          const viewBox = $('svg').attr('viewBox');

          if (!viewBox && width && height) {
            $('svg').attr('viewBox', `0 0 ${width} ${height}`);
          }

          // Remove unneeded attributes
          $('svg').removeAttr('class').removeAttr('height').removeAttr('width');

          // Add class attribute
          $('svg').attr('class', `icon icon-${basename}`);

          return svgo.optimize($.xml());
        })
        .then((result) => fs.outputFileAsync(file, result.data, 'utf-8'))
    )
  );
