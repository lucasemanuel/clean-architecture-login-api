module.exports = class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const HttpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(HttpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
