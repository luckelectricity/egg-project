'use strict'

const Controller = require('egg').Controller

class wordController extends Controller {
  // 一次添加一个单词
  async addword() {
    const { ctx } = this
    try {
      const { word } = ctx.request.body
      const isWord = await ctx.service.word.findWord(word)
      if (isWord === null) {
        const res = await ctx.service.word.addWord()
        ctx.body = {
          code: 200,
          data: res,
          msg: '添加成功',
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '单词已存在',
        }
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: error,
      }
    }
  }

  // 一次添加多个单词
  async addAllWords() {
    // TODO
  }

  async delWord() {
    // TODO
  }
}

module.exports = wordController
