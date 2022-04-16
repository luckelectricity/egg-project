'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app
  router.get('/', controller.home.index)
  // user
  router.get('/read', jwt, controller.user.read)
  router.post('/create', controller.user.createUser)
  router.post('/login', controller.user.login)

  // words
  router.post('/wordAdd', jwt, controller.word.addword)
}
