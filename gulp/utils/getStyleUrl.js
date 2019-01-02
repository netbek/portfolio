const {Penrose} = require('penrose');
const gulpConfig = require('../config');

const penrose = new Penrose(gulpConfig.penrose);

module.exports = (styleName, path) => {
  const {format} = gulpConfig.imageStyles[styleName];
  const url = penrose.getStyleURL(styleName, path, format);

  if (
    url.substring(1, 1 + gulpConfig.dist.base.length) === gulpConfig.dist.base
  ) {
    return '/' + url.substring(1 + gulpConfig.dist.base.length);
  }

  return url;
};
