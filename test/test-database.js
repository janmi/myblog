const Database = require('./database');
const client = new Database('./test.db');

client.on('load', () => {
  const foo = client.get('foo');
  console.log(foo)

  client.set('bar', 'my sweet value', function (err) {
    if (err) return console.log(err)

    console.log('write successful');
  });
  client.del('baz', function () {})
})
