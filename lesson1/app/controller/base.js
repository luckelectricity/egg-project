'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      msg: 'success',
      data,
    }
  }
  error(msg) {
    this.ctx.body = {
      code: -1,
      msg,
    }
  }
}

module.exports = BaseController
