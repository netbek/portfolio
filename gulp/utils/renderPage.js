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
  const {
    page: {isFront},
    page
  } = context;

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

  return renderPromise(template, {
    ...context,
    page: {...page, slug, classNames}
  }).then((content) =>
    renderPromise(pageTemplate, {
      ...context,
      page: {...page, slug, classNames, content}
    }).then((html) => fs.outputFileAsync(dest, html, 'utf-8'))
  );
};
