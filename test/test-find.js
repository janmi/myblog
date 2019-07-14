const finder = require('./find');
const txtReg = /^.+\.txt$/;
finder.find(txtReg, './', (err, results) => {
  if (err) return consolr.log(err);

  console.log(results)
})
