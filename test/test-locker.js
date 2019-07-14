const locker = require('./locker');

locker.lock(err => {
  if (err) throw err;

  locker.unlock(function () {
    console.log(1111)
  })
})
