'use strict'

const Controller = require('egg').Controller
const md5 = require('md5')
const dayjs = require('dayjs')

class UserController extends Controller {
  async register() {
    const { ctx, app } = this
    const { name, pwd } = ctx.request.body
    const user = await ctx.service.user.getUser(name)
    if (user) {
      ctx.body = {
        code: -1,
        msg: '用户已存在',
      }
      return
    }
    const newPassword = md5(pwd + app.config.salt)
    const result = await ctx.service.user.createUser({
      ...ctx.request.body,
      pwd: newPassword,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: result,
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '注册失败',
      }
    }
  }
}

module.exports = UserController
