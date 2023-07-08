const {Penrose} = require('penrose');
const gulpConfig = require('../config');

const penrose = new Penrose(gulpConfig.penrose);

module.exports = (uri) => {
  const scheme = penrose.getScheme(uri);

  if (scheme === 'vimeo') {
    return uri.replace(scheme + '://', 'https://vimeo.com/');
  }

  if (scheme === 'youtube') {
    return uri.replace(scheme + '://', 'https://youtube.com/');
  }

  return penrose.getURL(uri);
};
