const fs = require('fs');
const tls = require('tls');
const os = require('os');

const option = {
  key: fs.readFileSync('client.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  ca: [fs.readFileSync('server-cert.pem')],
  requestCert: os.hostname()
};
console.log(os.hostname())
const cleartextStream = tls.connect(8080, option, () => {
  let authorized = cleartextStream.authorized ? 'authorized' : 'unauthorized';
  console.log('Connected:', authorized);
  process.stdin.pipe(cleartextStream);
});

cleartextStream.setEncoding('utf8');
cleartextStream.on('data', (data) => {
  console.log(data)
})
