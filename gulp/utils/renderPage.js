const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const Promise = require('bluebird');
const renderPromise = require('./renderPromise');
const gulpConfig = require('../config');

Promise.promisifyAll(fs);

module.exports = (template, uri, context = {}) => {
  const pageTemplate = path.join('src/templates', 'base.njk');
  const uriSegments = uri.split(path.sep);
  const slug = _.last(uriSegments);
  const isFront = ~['front', 'home', 'index'].indexOf(slug);
  const url = '/' + _.trim(slug, '/');

  let pathSegments = [gulpConfig.dist.base];
  if (uriSegments.length > 1) {
    pathSegments = pathSegments.concat(uriSegments.slice(0, -1));
  }
  if (!isFront) {
    pathSegments.push(slug);
  }
  pathSegments.push('index.html');

  const classNameSegments = isFront ? [slug] : pathSegments.slice(1, -1);
  const classNames = classNameSegments.reduce(
    (result, value, key) =>
      result.concat([classNameSegments.slice(0, key + 1).join('-')]),
    []
  );

  const dest = path.join(...pathSegments);
  const {page} = context;

  return renderPromise(template, {
    ...context,
    page: {...page, slug, url, isFront, classNames}
  }).then(content =>
    renderPromise(pageTemplate, {
      ...context,
      page: {...page, slug, url, isFront, classNames, content}
    }).then(html => fs.outputFileAsync(dest, html, 'utf-8'))
  );
};
