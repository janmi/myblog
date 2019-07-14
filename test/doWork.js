const cp = require('child_process');
const cpus = require('os').cpus().length;

module.exports = function (workModule) {
  let awaiting = [];
  let readyPoll = [];
  let poolSize = 0;

  return function doWork (job, cb) {
    if (!readyPoll.length && poolSize > cpus)
      return awaiting.push([doWork, job, cb]);
    let child = readyPoll.length ? readyPoll.shift() : (poolSize++, cp.fork(workModule));
    let cbTriggered = false;

    child.removeAllListeners().once('error', function (err) {
      if (!cbTriggered) {
        cb(err);
        cbTriggered = true;
      }
      child.kill();
    }).once('exit', function () {
      if (!cbTriggered) {
        cb(new Error('Child exited with code:' + code));
      }
      poolSize--;
      let childIdx = readyPoll.indexOf(child);
      if (childIdx > -1) readyPoll.splice(childIdx, 1);
    }).once('message', function(msg) {
      cb(null, msg);
      cbTriggered = true;
      readyPoll.push(child);
      if (awaiting.length) setImmediate.apply(null, awaiting.shift());
    }).send(job);
  }
}
