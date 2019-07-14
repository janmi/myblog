const net = require('net');
const assert = require('assert');

let clients = 0;
let expectedAssertions = 2;

const server = net.createServer(client => {
  clients++;
  let clientId = clients;
  console.log('client connected:' + clientId);

  client.on('end', () => {
    console.log('Client disconnected:', clientId)
  })

  client.write('Welcome client: ' + clientId +'\r\n');
  client.pipe(client);
})

server.listen(8000, () => {
  console.log('Server started on port 8080');

  runTest(1, function () {
    runTest(2, function () {
      console.log('Test finished');
      assert.equal(0, expectedAssertions);
      server.close();
    });
  });
});

function runTest(expextedId, done) {
  let client = net.connect(8000);

  client.on('data', data => {
    let expexted = 'Welcome client: ' + expextedId +'\r\n';
    assert.equal(data.toString(), expexted);
    expectedAssertions--;
    client.end();
  })
  client.on('end', done);
}

