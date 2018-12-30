const {minify} = require('html-minifier');
const nunjucks = require('nunjucks');
const Promise = require('bluebird');
const Remarkable = require('remarkable');
const getStyleUrl = require('./getStyleUrl');
const getUrl = require('./getUrl');
const getVimeoId = require('./getVimeoId');
const getYoutubeId = require('./getYoutubeId');

const env = nunjucks.configure({
  noCache: true
});
const md = new Remarkable();

env.addFilter('markdown', str => md.render(str));
env.addFilter('style_url', (uri, styleName) => getStyleUrl(styleName, uri));
env.addFilter('url', uri => getUrl(uri));
env.addFilter('vimeo_id', uri => getVimeoId(uri));
env.addFilter('youtube_id', uri => getYoutubeId(uri));

module.exports = (template, context = {}) =>
  new Promise((resolve, reject) => {
    env.render(template, context, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          minify(result, {
            collapseWhitespace: true,
            conservativeCollapse: true
          })
        );
      }
    });
  });
