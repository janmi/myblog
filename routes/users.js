const users = ctx => {
	// console.dir(ctx.params)
	const id = ctx.params.id 
	ctx.response.body = id
}

const list = ctx => {
	ctx.response.body = 'this is usre list'
}

module.exports = {
	users,
	list
}