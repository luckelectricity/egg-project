'use strict'

const Controller = require('egg').Controller
const md5 = require('md5')
const dayjs = require('dayjs')

const BaseController = require('./base')

class UserController extends BaseController {
  async createToken(data) {
    const { ctx, app } = this
    // ctx.session[data.id] = data.id
    await app.redis.set(
      data.id,
      JSON.stringify(data),
      'EX',
      app.config.redis.expires
    )
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: app.config.jwt.expiresIn,
    })
  }

  async register() {
    const { ctx, app } = this
    const { name, pwd } = ctx.request.body
    const user = await ctx.service.user.getUser(name)
    if (user) {
      // ctx.body = {
      //   code: -1,
      //   msg: '用户已存在',
      // }
      this.error('用户已存在')
      return
    }
    const newPassword = md5(pwd + app.config.salt)
    const result = await ctx.service.user.createUser({
      ...ctx.request.body,
      pwd: newPassword,
      createTime: ctx.helper.time(),
    })
    if (result) {
      const token = await this.createToken({
        name,
        id: result.id,
      })
      this.success({
        ...ctx.helper.unPick(result.dataValues, ['pwd']),
        createTime: ctx.helper.timesTamp(result.dataValues.createTime),
        token,
      })
    } else {
      this.error('注册失败')
    }
  }

  async login() {
    const { ctx, app } = this
    const { name, pwd } = ctx.request.body
    const newPassword = md5(pwd + app.config.salt)
    const user = await ctx.service.user.getUser(name)
    if (!user) {
      this.error('用户不存在')
      return
    }
    if (user.pwd !== newPassword) {
      this.error('密码错误')
      return
    }

    const token = await this.createToken({
      id: user.id,
      name: user.name,
    })
    this.success({
      token,
      ...ctx.helper.unPick(user.dataValues, ['pwd']),
      createTime: ctx.helper.timesTamp(user.dataValues.createTime),
    })
  }

  async detail() {
    const { ctx } = this
    const user = await ctx.service.user.getUser(ctx.username)
    if (user) {
      this.success({
        ...ctx.helper.unPick(user.dataValues, ['pwd']),
        createTime: ctx.helper.timesTamp(user.dataValues.createTime),
      })
    } else {
      this.error('用户不存在')
    }
  }

  async logout() {
    const { ctx, app } = this
    try {
      app.redis.del(ctx.userId)
      this.success()
    } catch (error) {
      this.error('退出失败')
    }
  }
  async edit() {
    const { ctx } = this
    const params = ctx.params()
    await ctx.service.user.edit({
      ...params,
      updateTime: ctx.helper.time(),
    })
    const user = await ctx.service.user.getUser(ctx.username)
    this.success({
      ...ctx.helper.unPick(user.dataValues, ['pwd']),
      updateTime: ctx.helper.timesTamp(user.dataValues.updateTime),
    })
  }
}

module.exports = UserController
