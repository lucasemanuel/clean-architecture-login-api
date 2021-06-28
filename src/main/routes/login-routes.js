const loginRouter = require('../composer/login-router-composer')
const ExpressRouterAdapter = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/login', ExpressRouterAdapter.adapt(loginRouter))
}
