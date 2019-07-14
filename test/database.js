const fs = require('fs');
const EventEmitter = require('events').EventEmitter

const Datebase = function (path) {
  this.path = path;

  this._records = Object.create(null);
  this._writeStream = fs.createWriteStream(this.path, {
    encoding: 'utf8',
    flags: 'a'
  })
  this._load()
}

Datebase.prototype = Object.create(EventEmitter.prototype)

Datebase.prototype._load = function () {
  const stream = fs.createReadStream(this.path, {encoding: 'utf8'});
  const datebase = this;

  let data = '';
  stream.on('readable', function(event) {
    data += stream.read();
    let records = data.split('/n');
    data = records.pop();
    for (var i = 0; i < records.length; i++) {
      try {
        let record = JSON.parse(records[i]);
        if (record === null) {
          delete datebase._records[record.key];
        } else {
          datebase._records[record.key] = record.value;
        }
      } catch (err) {
        datebase.emit('error', 'found invalid record:', records[i])
      }
    }
  });
  stream.on('end', function (){
    datebase.emit('load')
  })
}

Datebase.prototype.get = function (key) {
  return this._records[key] || null
}

Datebase.prototype.set = function (key, value, cb) {
  let toWrite = JSON.stringify({key: key, value: value}) + '/n';

  if (value === null) {
    delete this._records[key]
  } else {
    this._records[key] = value
  }

  this._writeStream.write(toWrite, cb);
}

Datebase.prototype.del = function (key, cb) {
  return this.set(key, null, cb);
}

module.exports = Datebase;




