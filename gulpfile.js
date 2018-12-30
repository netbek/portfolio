const _ = require('lodash');
const fs = require('fs-extra');
const globPromise = require('glob-promise');
const gulp = require('gulp');
const livereload = require('livereload');
const open = require('open');
const path = require('path');
const {Penrose} = require('penrose');
const Promise = require('bluebird');
const webserver = require('gulp-webserver');
const buildCss = require('./gulp/utils/buildCss');
const buildJs = require('./gulp/utils/buildJs');
const buildModernizr = require('./gulp/utils/buildModernizr');
const copyVendor = require('./gulp/utils/copyVendor');
const loadData = require('./gulp/utils/loadData');
const renderPage = require('./gulp/utils/renderPage');
const startWatch = require('./gulp/utils/startWatch');

Promise.promisifyAll(fs);

/* ---------------------------------------------------------------------------------------------- */

const gulpConfig = require('./gulp/config');
const webpackConfigDev = require('./webpack.config.dev');
const webpackConfigProd = require('./webpack.config.prod');

const livereloadOpen =
  (gulpConfig.webserver.https ? 'https' : 'http') +
  '://' +
  gulpConfig.webserver.host +
  ':' +
  gulpConfig.webserver.port +
  (gulpConfig.webserver.open ? gulpConfig.webserver.open : '/');

const penrose = new Penrose(gulpConfig.penrose);

let livereloadServer;

/* ---------------------------------------------------------------------------------------------- */

// Deletes all HTML
gulp.task('html-clean', () => Promise.resolve());

// Creates pages HTML
gulp.task('html-build-pages', () =>
  loadData().then(data =>
    Promise.mapSeries(Object.keys(data.pages), slug => {
      const {[slug]: page} = data.pages;
      const template = path.join(gulpConfig.src.templates, slug + '.njk');
      const uri = path.join(slug);
      const context = {data, page};

      return renderPage(template, uri, context);
    })
  )
);

// Creates projects HTML
gulp.task('html-build-projects', () =>
  loadData().then(data =>
    Promise.mapSeries(Object.keys(data.projects), slug => {
      const {[slug]: page} = data.projects;
      const template = path.join(gulpConfig.src.templates, 'project.njk');
      const uri = path.join('work', slug);
      const context = {data, page};

      return renderPage(template, uri, context);
    })
  )
);

gulp.task(
  'html',
  gulp.series('html-clean', 'html-build-pages', 'html-build-projects')
);

// CSS
gulp.task('css-clean', () => fs.removeAsync(gulpConfig.dist.css));
gulp.task('css-build', () =>
  buildCss(path.join(gulpConfig.src.css, '**/*.scss'), gulpConfig.dist.css)
);
gulp.task('css', gulp.series('css-clean', 'css-build'));

// JS
gulp.task('js-clean', () => fs.removeAsync(gulpConfig.dist.js));
gulp.task('js-build', () =>
  globPromise(path.join(gulpConfig.src.js, '*.js')).then(files =>
    Promise.mapSeries(files, file => {
      const filename = path.basename(file);
      const basename = path.basename(file, path.extname(file));

      return buildJs({
        ...webpackConfigProd,
        entry: {
          [basename]: path.resolve(gulpConfig.src.js, filename),
          [basename + '.min']: path.resolve(gulpConfig.src.js, filename)
        },
        output: {
          filename: '[name].js',
          path: path.resolve(gulpConfig.dist.js)
        }
      });
    })
  )
);
gulp.task('js', gulp.series('js-clean', 'js-build'));

// Fonts
gulp.task('fonts-clean', () => fs.removeAsync(gulpConfig.dist.fonts));
gulp.task('fonts-build', () =>
  globPromise(path.join(gulpConfig.src.fonts, '**/*.{woff,woff2}'), {
    nodir: true
  }).then(files =>
    Promise.mapSeries(files, file =>
      fs.copyAsync(
        file,
        path.join(gulpConfig.dist.fonts, path.basename(file)),
        {preserveTimestamps: true}
      )
    )
  )
);
gulp.task('fonts', gulp.series('fonts-clean', 'fonts-build'));

// Deletes derivate images
gulp.task('penrose-clean', () =>
  fs.removeAsync(path.join(gulpConfig.penrose.schemes.public.path, 'styles'))
);

// Creates derivative images
gulp.task('penrose-build', () =>
  Promise.mapSeries(Object.values(gulpConfig.penrose.tasks), task =>
    Promise.mapSeries(task.src.map(src => penrose.resolvePath(src)), src =>
      globPromise(src)
    )
      .then(groups =>
        groups
          .reduce((result, files) => result.concat(files), [])
          // Include only files inside public directory
          .filter(file => ~file.indexOf(gulpConfig.penrose.schemes.public.path))
          // Strip base dir from file path and add scheme
          .map(
            file =>
              'public://' +
              file.substring(gulpConfig.penrose.schemes.public.path.length)
          )
          .reduce(
            (result, src) =>
              result.concat(
                task.styles.map(styleName => {
                  const style = gulpConfig.imageStyles[styleName];
                  const dist = penrose.getStylePath(styleName, src);

                  return {
                    style,
                    src,
                    dist
                  };
                })
              ),
            []
          )
      )
      .then(tasks =>
        Promise.mapSeries(tasks, task =>
          penrose.createDerivative(task.style, task.src, task.dist)
        )
      )
  )
);

// Deletes and creates derivative images
gulp.task('penrose', gulp.series('penrose-clean', 'penrose-build'));

// Build vendor files
gulp.task('vendor-clean', () => fs.removeAsync(gulpConfig.dist.vendor));
gulp.task('vendor-copy', copyVendor);
gulp.task('vendor-modernizr', buildModernizr);
gulp.task('vendor', gulp.series('vendor-copy', 'vendor-modernizr'));

gulp.task(
  'dev',
  gulp.series(
    'css',
    'js',
    'fonts',
    // 'penrose',
    'vendor',
    'html'
  )
);

gulp.task(
  'prod',
  gulp.series('css', 'js', 'fonts', 'penrose', 'vendor', 'html')
);

// Starts the webserver
gulp.task('webserver-init', cb => {
  gulp
    .src(gulpConfig.dist.base)
    .pipe(webserver({...gulpConfig.webserver, open: false}))
    .on('end', cb);
});

// Starts the LiveReload server
gulp.task(
  'livereload-init',
  _.once(cb => {
    livereloadServer = livereload.createServer();
    open(livereloadOpen, gulpConfig.webserver.browser);
    cb();
  })
);

// Refreshes the page
gulp.task('livereload-reload', cb => {
  livereloadServer.refresh(livereloadOpen);
  cb();
});

gulp.task('watch:livereload', function() {
  [
    // CSS
    {
      files: [path.join(gulpConfig.src.css, '**/*.scss')],
      tasks: ['css']
    },
    // JS
    {
      files: [path.join(gulpConfig.src.js, '**/*.js')],
      tasks: ['js']
    },
    // HTML and data
    {
      files: [
        path.join('src/data', '*.yaml'),
        path.join(gulpConfig.src.templates, '*.njk')
      ],
      tasks: ['html']
    }
  ].forEach(config => {
    startWatch(config.files, [].concat(config.tasks, ['livereload-reload']));
  });
});

gulp.task(
  'livereload',
  gulp.series('dev', 'webserver-init', 'livereload-init', 'watch:livereload')
);

exports.default = gulp.series('prod');
