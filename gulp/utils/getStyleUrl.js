const {Penrose} = require('penrose');
const gulpConfig = require('../config');

const penrose = new Penrose(gulpConfig.penrose);

module.exports = (styleName, path) => penrose.getStyleURL(styleName, path);
