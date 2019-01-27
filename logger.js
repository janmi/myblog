const logger = async function (ctx, next) {
	console.log(`${+new Date()}-${ctx.request.method}-${ctx.request.url}`)
	await next()
}

module.exports = logger