const about = ctx => {
	ctx.response.type = 'html'
	ctx.response.body = 'this is about, go to<a href="/">home</>'
}

module.exports = about