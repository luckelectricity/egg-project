'use strict'

const BaseController = require('./base')

class WordController extends BaseController {
  async addWord() {
    const word = await this.ctx.service.word.addWord()
    if (word.code === -1) {
      return this.error(word.msg)
    }
    this.success(word)
  }
  async getWord() {
    const { ctx } = this
    const { word } = ctx.request.body
    const wordInfo = await this.ctx.service.word.findWord(word)
    this.success({ wordInfo })
  }
}

module.exports = WordController
