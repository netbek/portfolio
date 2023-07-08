const re = [
  'youtube.com/watch[#?].*?v=([^"& ]+)',
  'youtube.com/embed/([^"&? ]+)',
  'youtube.com/v/([^"&? ]+)',
  'youtube.com/?v=([^"& ]+)',
  'youtu.be/([^"&? ]+)',
  'gdata.youtube.com/feeds/api/videos/([^"&? ]+)'
].map((pattern) => new RegExp(pattern, 'i'));

module.exports = (uri) => {
  const url = uri.replace('youtube://', 'https://youtube.com/');

  let matches;

  for (let i = 0, len = re.length; i < len; i++) {
    matches = url.match(re[i]);

    if (matches && matches[1]) {
      return matches[1];
    }
  }

  return undefined;
};
