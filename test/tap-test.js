const index = require('./mocha-index');
const test = require('tap').test;

test("Alex's handy mathematics module", (t) => {
  t.test('square', (t) => {
    t.equal(index.square(4), 16);
  });

  t.test('randomTimeout', (t) => {
    t.plan(1);
    index.randomTimeout(() => {
      t.ok(true);
    });
  });
  t.end();
})
