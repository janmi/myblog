const assert = require('assert');
const fs = require('fs');

const CSVParser = require('./CSVParser');
const parser = new CSVParser();
let actual = [];

fs.createReadStream(__dirname + '/test.csv').pipe(parser)

process.on('exit', () => {
  actual.push(parser.read());
  actual.push(parser.read());
  actual.push(parser.read());
  console.log(parser.read())
  const expected = [
    {
      name: 'Joy',
      age: '28'
    }, {
      name: 'Joy2',
      age: '29'
    }, {
      name: 'Joy3',
      age: '30'
    }
  ]

  assert.deepEqual(expected, actual)
})
