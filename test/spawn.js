const cp = require('child_process');
const fs = require('fs');
// const child = cp.spawn('echo', ['hello', 'world']);

// child.on('error', console.error);
// child.stdout.pipe(process.stdout);
// child.stderr.pipe(process.stderr)

// const cat = cp.spawn('cat', ['write.txt']);
// const input = fs.createReadStream('./write.txt');
// const sort = cp.spawn('sort');
// const uniq = cp.spawn('uniq');

// cat.stdout.pipe(sort.stdin);
// input.pipe(sort.stdin);
// sort.stdout.pipe(uniq.stdin);
// uniq.stdout.pipe(process.stdout);

// cp.exec('cat write.txt | sort | uniq', function (err, stdout, stderr) {
//   console.log(stdout)
// })

cp.spawn('mkdir', ['test-dir']);
