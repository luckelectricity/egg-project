'use strict'

const Service = require('egg').Service

class WordService extends Service {
  async findWord(word) {
    try {
      const { ctx } = this
      const res = await ctx.model.Words.findOne({ where: { word: word } })
      console.log(res, 'res')
      return res
    } catch (error) {
      console.log(error, 'findWord')
    }
  }
  async addWord() {
    const { ctx } = this
    const rule = {
      word: { type: 'string', required: true, message: 'word必填' },
      status: { type: 'int', required: true, message: 'status必填' },
      grade: { type: 'string', required: true, message: 'grade必填' },
    }
    try {
      ctx.validate(rule, ctx.request.body)
      return await ctx.model.Words.create(ctx.request.body)
    } catch (error) {
      console.log(error, 'addWord')
      ctx.body = {
        code: -1,
        msg: '参数错误',
      }
    }
  }
}

module.exports = WordService
