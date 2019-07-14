const fs = require('fs')
let hasLock = false;
const lockDir = 'config.lock';

exports.lock = function (cb) {
  if (hasLock) return cb()

  fs.mkdir(lockDir, (err) => {
    if (err) return cb(err)

    fs.writeFile(lockDir + '/'+ process.pid, process.pid, (err) => {
      if (err) console.error(err);

      hasLock = true;
      return cb()
    })
  })
}


exports.unlock = function (cb) {
  if (!hasLock) return cb();

  fs.unlink(lockDir + '/' + process.pid, (err) => {
    if (err) return cb(err)

    fs.rmdir(lockDir, (err) => {
      if (err) return cb(err)
      hasLock = false;
      cb();
    })
  })
}


process.on('exit', () => {
  if (hasLock) {
    fs.unlinkSync(lockDir + '/' + process.pid);
    fs.rmdirSync(lockDir);
    console.log('removed lock');
  }
})

