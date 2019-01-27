const login = (ctx, next) => {
  ctx.response.type = 'json'
  ctx.response.body = {
    status: true,
    message: 'success'
  }
}

module.exports = login
