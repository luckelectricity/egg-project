'use strict'

const Controller = require('egg').Controller
const md5 = require('md5')
const { salt } = require('../common/salt')

class CrudController extends Controller {
  async read() {
    const { ctx } = this
    const res = await ctx.model.User.findAll()
    ctx.body = res
  }
  async createUser() {
    const { ctx } = this
    ctx.logger.info('打印日志')
    const rule = {
      name: { type: 'string', required: true, message: 'name必填' },
      age: { type: 'int?' },
      password: { type: 'string', required: true },
      email: { type: 'email', required: true, message: '邮箱格式不正确' },
    }
    try {
      const errMsg = ctx.validate(rule, ctx.request.body)
      console.log(errMsg)
      const { name, age, password, email } = ctx.request.body
      const isEmail = await ctx.model.User.findOne({ where: { email: email } })
      if (isEmail === null) {
        const res = await ctx.model.User.create({
          name,
          age,
          password: md5(password + salt),
          email,
        })
        ctx.body = {
          code: 200,
          msg: '创建成功',
          data: {
            id: res.id,
            name: res.name,
            age: res.age || null,
            email: res.email,
          },
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '邮箱已存在',
        }
      }
    } catch (error) {
      console.log(error.errors)
      ctx.body = {
        code: -1,
        msg: error.errors[0].message ? error.errors[0].message : '参数错误',
      }
    }
  }
}

module.exports = CrudController
