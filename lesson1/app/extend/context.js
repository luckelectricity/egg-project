module.exports = {
  get user() {
    const token = this.request.header.token
    try {
      return token
        ? this.app.jwt.verify(token, this.app.config.jwt.secret)
        : undefined
    } catch (error) {
      return undefined
    }
  },
  get username() {
    const token = this.request.header.token
    try {
      const user = token
        ? this.app.jwt.verify(token, this.app.config.jwt.secret)
        : undefined
      return user ? user.name : undefined
    } catch (error) {
      return undefined
    }
  },

  params(key) {
    const method = this.request.method
    if (method === 'GET') {
      return key ? this.query[key] : this.query
    }
    return key ? this.request.body[key] : this.request.body
  },
}
