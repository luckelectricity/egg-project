const Service = require('egg').Service
class UserService extends Service {
  async isEmail(email) {
    const { ctx } = this
    const res = await ctx.model.User.findOne({ where: { email: email } })
    return res
  }
}
module.exports = UserService
