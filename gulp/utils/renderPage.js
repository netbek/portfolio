const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const Promise = require('bluebird');
const renderPromise = require('./renderPromise');

Promise.promisifyAll(fs);

module.exports = (context, slug, dir) => {
  const template = path.join('src/templates', 'base.njk');

  const destParts = ['public'];
  if (!_.isUndefined(dir)) {
    destParts.push(dir);
  }

  if (!~['front', 'home', 'index'].indexOf(slug)) {
    destParts.push(slug);
  }
  destParts.push('index.html');
  const dest = path.join(...destParts);

  return renderPromise(template, context).then(html =>
    fs.outputFileAsync(dest, html, 'utf-8')
  );
};
