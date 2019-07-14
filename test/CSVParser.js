const fs = require('fs');
const stream = require('stream');

CSVParser.prototype = Object.create(stream.Transform.prototype, {
  constructor: {
    value: CSVParser
  }
})

function CSVParser (options = {}) {
  options.objectMode = true;
  stream.Transform.call(this, options);
  this.value = '';
  this.headers = [];
  this.values = [];
  this.line = 0;
}

CSVParser.prototype._transform = function (chunk, encoding, done) {
  let c;
  let i;

  chunk = chunk.toString();

  for (i = 0; i < chunk.length; i++) {
    c = chunk.charAt(i);
    if (c === ',') {
      this.addValue();
    } else if (c === 'n') {
      this.addValue();
      if (this.line > 0) {
        this.push(JSON.stringify(this.toObject()));
      }
      this.values = [];
      this.line++;
    } else {
      this.value += c
    }
  }
  done()
}

CSVParser.prototype.toObject = function () {
  var i;
  var obj = {};
  for (i = 0; i < this.headers.length; i++) {
    obj[this.headers[i]] = this.values[i];
  }
  return obj;
}

CSVParser.prototype.addValue = function () {
  if (this.line === 0) {
    this.headers.push(this.value);
  } else {
    this.values.push(this.value);
  }
  this.value = '';
}


// var parser = new CSVParser();
// fs.createReadStream(__dirname + '/img-slice.csv').pipe(parser).pipe(process.stdout)

module.exports = CSVParser


