const dns = require('dns');

dns.lookup('www.google.com', (err, address) => {
  if (err) {
    console.error('Error:', err);
  }
  console.log('Address:', address);
})

console.log('===================')

dns.resolve('www.baidu.com', (err, address) => {
  if (err) {
    console.error('Error:', err);
  }
  console.log('Address:', address);
})
