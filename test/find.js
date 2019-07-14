const fs = require('fs');
const join = require('path').join;

exports.find = function(nameRe, startPath, cb) {
  let results = [];
  let asyncOps = 0;
  let errored = false;

  function error (err) {
    if (!errored) cb(err);
    errored = true
  }

  function finder (path) {
    asyncOps++;
    fs.readdir(path, (err, files) => {
      if (err) return error(err);

      files.forEach((file) => {
        let fpath = join(path, file);

        asyncOps++;
        fs.stat(fpath, (err, stats) => {
          if (err) return error(err);

          if (stats.isDirectory()) finder(fpath);
          if (stats.isFile() && nameRe.test(fpath)) results.push(fpath);

          asyncOps--;
          if (asyncOps === 0) cb(null, results);
        })
      })
      asyncOps--;
      if (asyncOps === 0) cb(null, results);
    })
  }
  finder(startPath)
}
