'use strict'

const BaseService = require('./base')

class WordService extends BaseService {
  async findWord(word) {
    return this.run(async () => {
      const wordInfo = await this.ctx.model.Words.findOne({
        where: {
          word,
        },
      })
      return wordInfo
    })
  }
  async addWord() {
    return this.run(async () => {
      const { ctx } = this
      const rule = {
        word: { type: 'string', required: true, message: 'word必填' },
        status: { type: 'int', required: true, message: 'status必填' },
        grade: { type: 'int', required: true, message: 'grade必填' },
        mean: { type: 'string', required: true, message: 'mean必填' },
      }
      ctx.validate(rule, ctx.request.body)
      return await ctx.model.Words.create(ctx.request.body)
    })
  }
}

module.exports = WordService
