const fs = require('fs');
const tls = require('tls');

const option = {
  key: fs.readFileSync('server.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: [fs.readFileSync('client-cert.pem')],
  requestCert: true
};

const server = tls.createServer(option, (cleartextStream) => {
  let authorized = cleartextStream.authorized ? 'authorized' : 'unauthorized';

  console.log('Connected:', authorized);
  cleartextStream.write('Welcome!\n');
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
})

server.listen(8080, () => {
  console.log('server listening');
})
