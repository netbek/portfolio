const gulp = require('gulp');

/**
 * Starts a watcher
 *
 * @param {Array}   files
 * @param {Array}   tasks
 * @param {boolean} live - Set to `true` to force livereload to refresh the page
 */
module.exports = (files, tasks, live = false) => {
  if (live) {
    tasks.push('livereload-reload');
  }
  gulp.watch(files, gulp.series(...tasks));
};
