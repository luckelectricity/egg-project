const Service = require('egg').Service

class IndexService extends Service {
  async index() {
    return {
      1: 'hahah',
    }
  }
}
