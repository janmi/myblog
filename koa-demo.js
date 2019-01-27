const Koa = require('koa')
const route = require('koa-route')
const path = require('path')
const serve = require('koa-static') // 设置静态资源路由
const fs = require('fs.promised')

// 中间件
const logger = require('./logger.js')

const app = new Koa()

const main = ctx => {
	ctx.response.body = 'holle koa'
}

const about = ctx => {
	ctx.response.type = 'html'
	ctx.response.body = 'this is about, go to<a href="/">home</>'
}

const readFileIndex = async function (ctx, next) {
	ctx.response.type = 'html'
	ctx.response.body = await fs.readFile('./index.html', 'utf8')
}

const curStatic = serve(path.join(__dirname))
app.use(logger)
app.use(route.get('/list', readFileIndex))
app.use(route.get('/about', about))
app.use(curStatic)
//app.use(readFileIndex)

app.listen(3000)