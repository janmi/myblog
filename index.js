const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const statice = require('koa-static')
const logger = require('./logger.js')
const views = require('koa-views')
const errorHandler = require('./error.js')
// routes Middleware
const indexRoute = require('./routes/index.js')
const aboutRoute = require('./routes/about.js')
const usersRouter = require('./routes/users.js')
const articleAddRouter = require('./routes/article-add.js')
// const articleDetailRouter = require('./routes/article-detail.js')

const app = new Koa()
const router = new Router()

// GET
router.get('/', indexRoute)
router.get('/about', aboutRoute)
router.get('/users/:id', usersRouter.users)

// POST
router.post('/v1/login')
router.post('/v1/article-add', articleAddRouter)
router.post('/v1/article-detail', articleAddRouter)

app.use(errorHandler)
app.use(logger)

app.use(views(path.join(__dirname, './views'), {
	extension: 'ejs'
}))

app.use(router.routes())
   .use(router.allowedMethods())

app.listen(3000)
