'use strict'

const BaseService = require('./base')
class UserService extends BaseService {
  getUser(name) {
    return this.run(async () => {
      const user = await this.ctx.model.User.findOne({
        where: {
          name,
        },
      })
      return user
    })
  }
  createUser(params) {
    return this.run(async () => {
      const user = await this.ctx.model.User.create(params)
      return user
    })
  }
  edit(params) {
    return this.run(async () => {
      const user = await this.ctx.model.User.update(params, {
        where: {
          name: this.ctx.username,
        },
      })
      return user
    })
  }
}
module.exports = UserService
