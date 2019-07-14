const index = require('./mocha-index');
const assert = require('assert');

describe('Amazing mathematical operations', function () {
  it('should square numbers', () => {
    assert.equal(index.square(4), 16);
  });

  it('should run a callback after aa delay', (done) => {
    index.randomTimeout(() => {
      assert(true);
      done();
    })
  });

})
