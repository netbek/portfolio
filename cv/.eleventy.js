const yaml = require('js-yaml');

module.exports = (eleventyConfig) => {
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));
};
