const dayjs = require('dayjs')

module.exports = {
  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  timesTanp(data) {
    return new Date(data).getTime()
  },

  unPick(data, arr) {},
}
