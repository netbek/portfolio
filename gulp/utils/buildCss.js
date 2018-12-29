const autoprefixer = require('autoprefixer');
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpCssmin = require('gulp-cssmin');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const Promise = require('bluebird');

const gulpConfig = require('../config');

/**
 *
 * @param   {string} src
 * @param   {string} dest
 * @param   {string} destName
 * @returns {Promise}
 */
module.exports = (src, dest, destName = 'app.css') =>
  new Promise(resolve => {
    gulp
      .src(src)
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSass(gulpConfig.css.params).on('error', gulpSass.logError))
      .pipe(gulpPostcss([autoprefixer(gulpConfig.autoprefixer)]))
      .pipe(gulpConcat(destName))
      .pipe(gulp.dest(dest))
      .pipe(
        gulpCssmin({
          advanced: false
        })
      )
      .pipe(
        gulpRename({
          suffix: '.min'
        })
      )
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulp.dest(dest))
      .on('end', function() {
        resolve();
      });
  });
