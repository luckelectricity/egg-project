'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    // const res = await ctx.model.application.findAll()

    await ctx.render('luck.html', {
      username: 'luck',
    })
  }
  async add() {
    const { ctx } = this
    ctx.cookies.set('user', '刘欢', {
      httpOnly: false,
      encrypt: true,
      signed: false,
    })
    ctx.body = {
      status: 200,
      data: 'success',
    }
  }
  async get() {
    const { ctx } = this
    const coo = ctx.cookies.get('user', {
      signed: false,
      encrypt: true,
    })
    console.log(coo)
    ctx.body = {
      status: 200,
      data: 'success',
      coo,
    }
  }
  async update() {
    const { ctx } = this
    ctx.cookies.set('user', 'update')
    ctx.body = {
      status: 200,
      data: 'update success',
    }
  }
  async del() {
    const { ctx } = this
    ctx.cookies.set('user', null)
    ctx.body = {
      status: 200,
      data: 'del success',
    }
  }
  async addSession() {
    const { ctx } = this
    ctx.session.username = '四碗饭加油'
    const username = ctx.session.username
    await ctx.render('luck.html', {
      username,
    })
  }
}

module.exports = HomeController
