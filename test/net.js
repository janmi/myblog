const net = require('net');
let clients = 0;

const server = net.createServer(client => {
  clients++;
  let clientId = clients;
  console.log('Client connected:', clientId);

  client.on('end', () => {
    console.log('Client disconnected:' + clientId)
  })

  client.write('Welcome client: ' + clientId + 'rn');
  client.pipe(client);
});

server.listen(8787, () => {
  console.log('Server started on port 8787');
})
