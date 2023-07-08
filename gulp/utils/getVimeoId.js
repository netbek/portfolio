const re = [
  'vimeo.com/(\\d+)',
  'vimeo.com/video/(\\d+)',
  'vimeo.com/groups/.+/videos/(\\d+)',
  'vimeo.com/channels/.+#(\\d+)'
].map((pattern) => new RegExp(pattern, 'i'));

module.exports = (uri) => {
  const url = uri.replace('vimeo://', 'https://vimeo.com/');

  let matches;

  for (let i = 0, len = re.length; i < len; i++) {
    matches = url.match(re[i]);

    if (matches && matches[1]) {
      return matches[1];
    }
  }

  return undefined;
};
