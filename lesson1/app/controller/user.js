'use strict'

const Controller = require('egg').Controller
const md5 = require('md5')
const { salt } = require('../common/salt')

class CrudController extends Controller {
  // 查询所有用户
  async read() {
    const { ctx } = this
    const res = await ctx.model.User.findAll()
    ctx.body = res
  }
  // 用户注册
  async createUser() {
    const { ctx } = this
    const rule = {
      name: { type: 'string', required: true, message: 'name必填' },
      age: { type: 'int?' },
      password: { type: 'string', required: true },
      email: { type: 'email', required: true, message: '邮箱格式不正确' },
    }
    try {
      ctx.validate(rule, ctx.request.body)
      const { name, age, password, email } = ctx.request.body
      const isEmail = await ctx.service.user.isEmail(email)
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
  // 用户登陆
  async login() {
    const { ctx, app } = this
    const rule = {
      email: { type: 'email', required: true, message: '邮箱格式不正确' },
      password: { type: 'string', required: true },
    }
    try {
      const errMsg = ctx.validate(rule, ctx.request.body)
      const { email, password } = ctx.request.body
      console.log(ctx.service.user)
      const res = await ctx.service.user.isEmail(email)
      if (res) {
        if (md5(password + salt) === res.password) {
          //生成 token 的方式
          const token = app.jwt.sign(
            {
              email: res.email, //需要存储的 token 数据
              name: res.name,
              id: res.id,
            },
            app.config.jwt.secret
          )
          ctx.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            signed: false,
          })
          // 返回 token 到前端
          ctx.body = {
            code: 200,
            msg: '登录成功',
            data: {
              id: res.id,
              name: res.name,
              age: res.age || null,
              email: res.email,
              token,
            },
          }
        } else {
          ctx.body = {
            code: -1,
            msg: '密码错误',
          }
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '用户不存在',
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '参数错误',
      }
    }
  }
}

module.exports = CrudController
