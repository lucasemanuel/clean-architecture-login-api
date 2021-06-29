const LoginRouterComposer = require('../composer/login-router-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = router => {
  const loginRouter = LoginRouterComposer.compose()
  router.post('/login', adapt(loginRouter))
}
