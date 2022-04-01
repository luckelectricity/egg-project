'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app
  router.get('/', controller.home.index)
  router.post('/add', controller.home.add)
  router.post('/get', controller.home.get)
  router.post('/update', controller.home.update)
  router.post('/del', controller.home.del)
  router.get('/addSession', controller.home.addSession)
  router.get('/read', jwt, controller.crud.read)
  router.post('/create', controller.crud.createUser)
  router.post('/login', controller.crud.login)
}
