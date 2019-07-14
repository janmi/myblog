const fs = require('fs');
const assert = require('assert');

const fd = fs.openSync('./file.txt', 'w+');
const writeBuff = new Buffer('some data to write');

fs.writeSync(fd, writeBuff, 0, writeBuff.length, 0);

var readBuf = new Buffer(writeBuff.length);
fs.readSync(fd, readBuf, 0, writeBuff.length, 0);
assert.equal(writeBuff.toString(), readBuf.toString());

fs.closeSync(fd)

const readable = fs.createReadStream('./file.txt');
const writeable = fs.createWriteStream('./write.txt');

readable.pipe(writeable);
