'use strict'

const Controller = require('egg').Controller
const md5 = require('md5')
const dayjs = require('dayjs')

class UserController extends Controller {
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
      createTime: ctx.helper.time(),
    })
    if (result) {
      const token = await this.createToken({
        name,
        id: result.id,
      })
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: {
          ...ctx.helper.unPick(result.dataValues, ['pwd']),
          createTime: ctx.helper.timesTamp(result.dataValues.createTime),
          token,
        },
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '注册失败',
      }
    }
  }

  async login() {
    const { ctx, app } = this
    const { name, pwd } = ctx.request.body
    const newPassword = md5(pwd + app.config.salt)
    const user = await ctx.service.user.getUser(name)
    if (!user) {
      ctx.body = {
        code: -1,
        msg: '用户不存在',
      }
      return
    }
    if (user.pwd !== newPassword) {
      ctx.body = {
        code: -1,
        msg: '密码错误',
      }
      return
    }

    const token = await this.createToken({
      id: user.id,
      name: user.name,
    })
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {
        token,
        ...ctx.helper.unPick(user.dataValues, ['pwd']),
        createTime: ctx.helper.timesTamp(user.dataValues.createTime),
      },
    }
  }

  async detail() {
    const { ctx } = this
    const user = await ctx.service.user.getUser(ctx.username)
    if (user) {
      ctx.body = {
        code: 200,
        msg: '获取用户信息成功',
        data: {
          ...ctx.helper.unPick(user.dataValues, ['pwd']),
          createTime: ctx.helper.timesTamp(user.dataValues.createTime),
        },
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '用户不存在',
      }
    }
  }

  async logout() {
    const { ctx, app } = this
    try {
      app.redis.del(ctx.userId)
      ctx.body = {
        code: 200,
        msg: '退出成功',
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '退出失败',
      }
    }
  }
}

module.exports = UserController
