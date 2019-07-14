const assert = require('assert');

assert.match = match;

function match(actual, regex, message) {
  if (!actual.match(regex)) {
    console.log(1111)
    assert.fail(message);
  }
}

assert.match('{name: "Alex"}', /Alex/, 'The name should be "Alex"');

assert.throws(() => {
  assert.match('{name: "Alex"}', /xlex/, 'This should fail')
},
assert.AssertionError,
'A non-matching regex should throw an AssertionError'
);

