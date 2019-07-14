const http = require('http')
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

// http.createServer((req, res) => {
//   res.writeHead(200, {'content-encoding': 'gzip'})
//   fs.createReadStream(path.join(__dirname, '../') + '/index.html').pipe(zlib.createGzip()).pipe(res)
// }).listen(8000)

const stream = fs.createReadStream('not-fount')

stream.on('error', err => {
  console.trace(); // 打印完整的错误堆栈跟踪信息
  console.log('Stack:', err.stack)
  console.error('Then error', err)
})
