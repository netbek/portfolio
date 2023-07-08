const {execSync} = require('child_process');

module.exports = () => {
  const pid = (execSync(`ps -p ${process.pid} -o ppid=`) + '').split('\n')[0];

  if (pid) {
    return parseInt(pid, 10);
  }

  return null;
};
