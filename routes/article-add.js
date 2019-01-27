const add = (ctx, next) => {
  console.log(ctx)
  ctx.response.type = 'json'
  ctx.response.body = {
    status: true,
    message: 'success'
  }
  next()
}

module.exports = add
