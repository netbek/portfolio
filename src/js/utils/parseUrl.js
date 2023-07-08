// Source: https://github.com/hirak/phpjs/blob/074bd74259b1fb02c23ae3f45574a2dd5a5e66b5/functions/url/parse_url.js

const re =
  /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;

export default (url) => {
  const matches = re.exec(url);

  if (!matches || !matches.length) {
    return undefined;
  }

  const [
    source,
    scheme,
    authority,
    userInfo,
    user,
    pass,
    host,
    port,
    relative,
    path,
    directory,
    file,
    query,
    fragment
  ] = matches;

  const hostNorm = (host || '').toLowerCase().replace(/^www\./, '');

  return {
    scheme,
    authority,
    userInfo,
    user,
    pass,
    host,
    hostNorm,
    port,
    relative,
    path,
    directory,
    file,
    query,
    fragment
  };
};
