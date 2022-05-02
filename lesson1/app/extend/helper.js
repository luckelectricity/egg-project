const dayjs = require('dayjs')

module.exports = {
  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  timesTamp(data) {
    return new Date(data).getTime()
  },

  unPick(source, arr) {
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (source.hasOwnProperty(item)) {
          delete source[item]
        }
      })
      return source
    }
  },
}
