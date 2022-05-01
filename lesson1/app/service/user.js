const Service = require('egg').Service
class UserService extends Service {
  async getUser(name) {
    try {
      const user = await this.ctx.model.User.findOne({
        where: {
          name,
        },
      })
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async createUser(params) {
    try {
      const user = await this.ctx.model.User.create(params)
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
module.exports = UserService
