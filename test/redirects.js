const http = require('http');
const https = require('https');
const url = require('url');

let request;

function Request() {
  this.maxRedirects = 10;
  this.redirects = 0;
}

Request.prototype.get = function(href, callback) {
  let uri = url.parse(href);
  let options = {host: uri.host, path: uri.path};
  let httpGet = uri.protocol === 'http' ? http.get : https.get

  console.log('GET:', href)

  function processResponse (response) {
    if (response.statusCode >= 300 && response.statusCode < 400) {
      if (this.redirects >= this.maxRedirects) {
        this.error = new Error('Too many redirects for:' + href);
      } else {
        this.redirects++;
        href = url.resolve(options.host, response.headers.location);
        return this.get(href, callback);
      }
    }
    response.url = href;
    response.redirects = this.redirects;

    console.log('Redirects:', href);

    function end () {
      console.log('Connection ended');
      callback(this.error, response);
    }

    response.on('data', (data) => {
      console.log('Got data, length:', data.length);
    })

    response.on('end', end.bind(this))
  }
  httpGet(options, processResponse.bind(this))
  .on('error', err => {
    callback(err)
  })
};

request = new Request();

request.get('http://www.google.com', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Fetched URL:', res.url, 'with', res.redirects, 'redirects');
    process.exit(0)
  }
});





