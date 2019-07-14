const stream = require('stream');

GreenStream.prototype = Object.create(stream.Writable.prototype, {
  constructor: {
    value: GreenStream
  }
})

function GreenStream (options) {
  stream.Writable.call(this)
}

GreenStream.prototype._write = function (chunk, encoding, callback) {
  process.stdout.write(chunk);
  callback();
}

process.stdin.pipe(new GreenStream());
