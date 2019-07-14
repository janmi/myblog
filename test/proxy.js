const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  console.log('start request:', req.url);
  const options = url.parse(req.url);
  options.headers = req.headers;
  const proxyRequest = http.request(options, (proxyRequest) => {
    proxyRequest.on('data', (chunk) => {
      console.log('proxyResponse length:', chunk.length);
      res.write(chunk, 'binary');
    });

    proxyRequest.on('end', () => {
      console.log('proxied request ended');
      res.end();
    });

    res.writeHead(proxyRequest.statusCode, proxyRequest.headers);
  });

  req.on('data', (chunk) => {
    console.log('in request length:', chunk.length);
    proxyRequest.write(chunk, 'binary');
  })
  req.on('end', () => {
    console.log('original request ended');
    proxyRequest.end()
  })
}).listen(8787)
