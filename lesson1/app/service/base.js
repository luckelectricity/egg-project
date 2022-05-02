'use strict'

const Service = require('egg').Service

class BaseService extends Service {
  run(callback) {
    try {
      return callback && callback() // 必须return才能接收到，尤其是异步情况
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

module.exports = BaseService
