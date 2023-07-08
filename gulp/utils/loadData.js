const _ = require('lodash');
const fs = require('fs-extra');
const globby = require('globby');
const path = require('path');
const {Penrose} = require('penrose');
const Promise = require('bluebird');
// const sharp = require('sharp');
const yaml = require('js-yaml');
const gulpConfig = require('../config');

const penrose = new Penrose(gulpConfig.penrose);

// const getImageMetadata = _.memoize(filePath => sharp(filePath).metadata());

module.exports = async () =>
  globby([path.join(gulpConfig.src.data, '**/*.yaml')])
    .then((files) =>
      Promise.mapSeries(files, (file) =>
        fs.readFileAsync(file, 'utf-8').then((data) => {
          const slug = path.basename(file, path.extname(file));
          const isFront = ~['front', 'home', 'index'].indexOf(slug);
          const dirname = path.dirname(
            file.substring(gulpConfig.src.data.length)
          );
          const key = dirname === '.' ? slug : dirname + '.' + slug;
          const value = yaml.load(data);

          value.isFront = isFront;

          if (dirname === 'projects') {
            value.url = '/work/' + slug;

            // Normalise media files
            return Promise.mapSeries(value.media, (d) => {
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
            }).then((media) => [key, {...value, media}]);
          }

          if (isFront) {
            value.url = '/';
          } else {
            value.url = '/' + slug;
          }

          return [key, value];
        })
      )
    )
    .then((data) =>
      _.zipObjectDeep(
        data.map((d) => d[0]),
        data.map((d) => d[1])
      )
    )
    .then((data) => {
      // Add pagination to projects
      const {'projects-list': projectsList, projects} = data;

      projectsList.forEach((name, i) => {
        const previous = _.get(projects, `${_.get(projectsList, i - 1)}.url`);
        const next = _.get(projects, `${_.get(projectsList, i + 1)}.url`);

        projects[name].pagination = {
          previous,
          next
        };
      });

      return data;
    });
