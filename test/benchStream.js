const fs = require('fs');
const zlib = require('zlib');

function benchStream (inSize, outSize) {
  const time = process.hrtime();
  let watermark = process.memoryUsage().rss;
  let input = fs.createReadStream('/usr/share/dict/words', {
    bufferSize: inSize
  });

  const gizp = zlib.createGzip({chunkSize: outSize});
  const output = fs.createWriteStream('out.gz', {bufferSize: inSize});

  const memoryCheck = setInterval(() => {
    let rss = process.memoryUsage().rss;
    if (rss > watermark) {
      watermark = rss;
    }
  }, 50);

  input.on('end', () => {
    const memoryEnd = process.memoryUsage();
    clearInterval(memoryCheck);
    const diff = process.hrtime(time);
    console.log([
      inSize,
      outSize,
      (diff[0] * 1e9 + diff[1]) / 1000000,
      watermark / 1024].join(', '));
  });

  input.pipe(gizp).pipe(output)

  return input;
}

console.log('flie size, gizp size, ms, RSS')

let fileSize = 128;
let zipSize = 5024;

function run (times) {
  benchStream(fileSize, zipSize).on('end', function() {
    times--;
    fileSize *= 2;
    zipSize *= 2;

    if (times > 0) {
      run(times);
    }

  });
}

run(10);


