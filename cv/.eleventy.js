const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = (eleventyConfig) => {
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  eleventyConfig.addNunjucksFilter('icon', (value) =>
    fs.readFileSync(path.join('src/svg', 'icons', value + '.svg'), 'utf-8')
  );

  eleventyConfig.addPassthroughCopy({
    'src/fonts/**/*.ttf': 'fonts'
  });

  eleventyConfig.setServerOptions({
    watch: ['dist/**/*.*']
  });
};
