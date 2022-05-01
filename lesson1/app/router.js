'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app
  router.post('/api/user/register', controller.user.register)
  // words
  // router.post('/wordAdd', jwt, controller.word.addword)
}
