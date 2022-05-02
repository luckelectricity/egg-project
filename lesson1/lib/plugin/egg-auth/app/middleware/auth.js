module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url
    const user = await ctx.app.redis.get(ctx.user.id)
    const name = ctx.username
    if (!options.exclude.includes(url.split('?')) && !user && !name) {
      ctx.body = {
        code: -1,
        msg: '请先登录',
      }
    } else {
      await next()
    }
  }
}
