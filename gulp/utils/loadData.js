const _ = require('lodash');
const fs = require('fs-extra');
const globPromise = require('glob-promise');
const path = require('path');
const Promise = require('bluebird');
const yaml = require('js-yaml');

const gulpConfig = require('../config');

module.exports = _.memoize(() =>
  globPromise(path.join(gulpConfig.src.data, '**/*.yaml'))
    .then(files =>
      Promise.mapSeries(files, file =>
        fs.readFileAsync(file, 'utf-8').then(data => {
          const basename = path.basename(file, path.extname(file));
          const dirname = path.dirname(
            file.substring(gulpConfig.src.data.length)
          );
          const key = dirname === '.' ? basename : dirname + '.' + basename;
          const value = yaml.safeLoad(data);

          if (dirname === 'projects') {
            // Normalise media files
            value.media = value.media.map(d => {
              const scheme = d.uri.split('://')[0];
              const filename = d.uri.split('://')[1];

              let type;

              if (scheme === 'vimeo' || scheme === 'youtube') {
                type = 'video';
              } else if (scheme === 'public') {
                const extname = _.trim(
                  path.extname(filename).toLowerCase(),
                  '.'
                );

                if (
                  extname === 'gif' ||
                  extname === 'jpg' ||
                  extname === 'png'
                ) {
                  type = 'image';
                } else {
                  throw new Error(`Cannot parse content type of ${filename}`);
                }
              } else {
                throw new Error(`Unsupported scheme: ${scheme}`);
              }

              return {
                ...d,
                layout: {
                  columns: 0,
                  frame: '',
                  ...d.layout
                },
                scheme: scheme,
                type: type
              };
            });
          }

          return [key, value];
        })
      )
    )
    .then(data => _.zipObjectDeep(data.map(d => d[0]), data.map(d => d[1])))
);
