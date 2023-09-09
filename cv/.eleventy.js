const yaml = require('js-yaml');

module.exports = (eleventyConfig) => {
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({'src/fonts/**/*.{woff,woff2}': 'fonts'});

  eleventyConfig.setServerOptions({
    watch: ['_site/**/*.*']
  });
};
