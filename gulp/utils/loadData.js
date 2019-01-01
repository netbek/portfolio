const _ = require('lodash');
const fs = require('fs-extra');
const globPromise = require('glob-promise');
const path = require('path');
const {Penrose} = require('penrose');
const Promise = require('bluebird');
// const sharp = require('sharp');
const yaml = require('js-yaml');
const gulpConfig = require('../config');

const penrose = new Penrose(gulpConfig.penrose);

// const getImageMetadata = _.memoize(filePath => sharp(filePath).metadata());

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
            return Promise.mapSeries(value.media, d => {
              const scheme = penrose.getScheme(d.uri);
              const target = penrose.getTarget(d.uri);

              let type;

              if (scheme === 'vimeo' || scheme === 'youtube') {
                type = 'video';
              } else if (scheme === 'public') {
                const extname = _.trim(path.extname(target).toLowerCase(), '.');

                if (
                  extname === 'gif' ||
                  extname === 'jpg' ||
                  extname === 'png'
                ) {
                  type = 'image';
                } else {
                  throw new Error(`Cannot parse content type of ${target}`);
                }
              } else {
                throw new Error(`Unsupported scheme: ${scheme}`);
              }

              const norm = {
                ...d,
                layout: {
                  columns: 0,
                  frame: '',
                  ...d.layout
                },
                scheme: scheme,
                type: type
              };

              // if (type === 'image') {
              //   return getImageMetadata(penrose.resolvePath(d.uri)).then(
              //     metadata => ({
              //       ...norm,
              //       width: metadata.width,
              //       height: metadata.height
              //     })
              //   );
              // }

              return norm;
            }).then(media => [key, {...value, media}]);
          }

          return [key, value];
        })
      )
    )
    .then(data => _.zipObjectDeep(data.map(d => d[0]), data.map(d => d[1])))
    .then(data => {
      // Add pagination to projects
      const {'projects-list': projectsList, projects} = data;

      projectsList.forEach((name, i) => {
        const previous = _.get(projectsList, i - 1);
        const next = _.get(projectsList, i + 1);

        projects[name].pagination = {
          previous,
          next
        };
      });

      return data;
    })
);
