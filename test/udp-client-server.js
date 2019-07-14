const dgram = require('dgram');
const fs = require('fs');
const path = require('path')
const port = 41230;
let defaultSize = 16;

function Client(remoteIp) {
  const inSteram = fs.createReadStream(path.join(__dirname, 'write.txt'));
  const socket = dgram.createSocket('udp4');

  inSteram.on('readable', () => {
    sendData();
  })

  function sendData () {
    let message = inSteram.read(defaultSize);
    if (!message) {
      return socket.unref();
    }

    socket.send(message, 0, message.length, port, remoteIp, (err, bytes) => {
      sendData();
    });

  }
}

function Server () {
  const socket = dgram.createSocket('udp4');

  socket.on('message', (msg, rinfo) => {
    process.stdout.write(msg.toString())
  });

  socket.on('listening', () => {
    console.log('Server ready:', socket.address());
  })
  socket.bind(port);
}

if (process.argv[2] === 'client') {
  new Client(process.argv[3])
} else {
  new Server();
}
