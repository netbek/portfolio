const _ = require('lodash');
const {minify} = require('html-minifier');
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const path = require('path');
const Promise = require('bluebird');
const Remarkable = require('remarkable');
const slugify = require('@sindresorhus/slugify');
const getStyleUrl = require('./getStyleUrl');
const getUrl = require('./getUrl');
const getVimeoId = require('./getVimeoId');
const getYoutubeId = require('./getYoutubeId');
const gulpConfig = require('../config');

const env = nunjucks.configure({
  noCache: true
});

const md = new Remarkable();

env.addFilter(
  'icon',
  _.memoize((iconName) =>
    fs.readFileSync(
      path.join(gulpConfig.src.svg, 'icons', iconName + '.svg'),
      'utf-8'
    )
  )
);

env.addFilter('includes', (array, value) => array.includes(value));
env.addFilter('markdown', (str) => md.render(str));
env.addFilter('slugify', (str) => slugify(str));
env.addFilter('style_url', (uri, styleName) => getStyleUrl(styleName, uri));
env.addFilter('url', (uri) => getUrl(uri));
env.addFilter('vimeo_id', (uri) => getVimeoId(uri));
env.addFilter('youtube_id', (uri) => getYoutubeId(uri));

module.exports = (template, context = {}) =>
  new Promise((resolve, reject) => {
    env.render(template, context, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          minify(result, {
            collapseWhitespace: true
          })
        );
      }
    });
  });
