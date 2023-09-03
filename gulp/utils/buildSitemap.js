const fs = require('fs-extra');
const loadData = require('./loadData');

module.exports = async (dest) => {
  const data = await loadData();
  const urls = [
    ...Object.entries(data.pages).map(([slug, page]) => {
      if (!page.isFront) {
        return data.settings.site.url + '/' + slug;
      }
    }),
    ...Object.entries(data.projects).map(([slug, page]) => {
      if (!page.isFront) {
        return data.settings.site.url + '/' + 'work' + '/' + slug;
      }
    })
  ]
    .filter(Boolean)
    .sort();

  return fs.outputFile(dest, urls.join('\n') + '\n', 'utf-8');
};
