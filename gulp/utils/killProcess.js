const findProcess = require('find-process');
const Promise = require('bluebird');

module.exports = (by, value, signal = 'SIGTERM', ignore = []) => {
  const _ignore = [process.pid].concat(ignore); // Ignore current process and given processes

  return findProcess('name', value, false)
    .then((list) =>
      list.filter((p) => !~_ignore.indexOf(p.pid)).map((p) => p.pid)
    )
    .then((list) =>
      Promise.mapSeries(list, (pid) => {
        if (!process.kill(pid, signal)) {
          return Promise.reject(new Error(`Failed to kill process ${pid}`));
        }
        return pid;
      })
    );
};
