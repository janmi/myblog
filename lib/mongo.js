const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()

mongolass.connect('mongodb://localhost:27017/test')// const mongolass = new Mongolass('mongodb://localhost:27017/test')

const User = mongolass.model('User', {
  name: { type: 'string' },
  age: { type: 'number' }
})

User
  .insertOne({ name: 'joy', age: 28 })
  .exec()
  .then((req) => {
    console.log('=====')
    console.log(req)
  })
  .catch(function (e) {
    console.error(e)
    console.error(e.stack)
  })
