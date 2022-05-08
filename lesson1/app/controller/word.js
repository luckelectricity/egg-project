'use strict'

const BaseController = require('./base')

class WordController extends BaseController {
  async addWord() {
    const word = await this.ctx.service.word.addWord()
    this.success(word)
  }
  async getWord() {
    const { ctx } = this
    const { word } = ctx.request.body
    const fy = await this.ctx.service.word.en2ZhWord(word)
    const en = await this.ctx.service.word.en2EnWord(word)
    this.success({ fy: fy.data, en: en.data })
  }
}

module.exports = WordController
