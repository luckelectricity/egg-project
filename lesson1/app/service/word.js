'use strict'

const BaseService = require('./base')
const md5 = require('md5')

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

  async en2ZhWord(word) {
    return this.run(async () => {
      const { ctx, app } = this
      const { salt, appid, miyao, from, to } = app.config.transQuery
      return await app.curl(app.config.baiduTransUrl, {
        method: 'POST',
        dataType: 'json',
        'Content-Type': 'application/x-www-form-urlencoded',
        data: {
          salt,
          appid,
          q: word,
          from,
          to,
          sign: md5(`${appid}${word}${salt}${miyao}`),
        },
      })
    })
  }

  async en2EnWord(word) {
    return this.run(async () => {
      const { ctx, app } = this
      return await app.curl(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        {
          dataType: 'json',
          method: 'GET',
        }
      )
    })
  }
}

module.exports = WordService
