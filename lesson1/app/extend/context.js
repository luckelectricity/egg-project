module.exports = {
  get user() {
    const token = this.request.header.token
    return token
      ? this.app.jwt.verify(token, this.app.config.jwt.secret)
      : undefined
  },
  get username() {
    const token = this.request.header.token
    const user = token
      ? this.app.jwt.verify(token, this.app.config.jwt.secret)
      : undefined
    return user ? user.name : undefined
  },
}
