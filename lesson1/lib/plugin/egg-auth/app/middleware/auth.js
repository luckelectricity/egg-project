module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url
    if (
      !options.exclude.includes(url.split('?')[0]) &&
      !ctx.request.header.token
    ) {
      ctx.body = {
        code: -1,
        msg: '请先登录',
      }
    } else {
      await next()
    }
  }
}
