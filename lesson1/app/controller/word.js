'use strict'

const BaseController = require('./base')

class WordController extends BaseController {
  async addWord() {
    const word = await this.ctx.service.word.addWord()
    this.success(word)
  }
}

module.exports = WordController
