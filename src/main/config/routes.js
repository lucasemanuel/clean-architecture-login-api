const path = require('path')
const fg = require('fast-glob')
const router = require('express').Router()

module.exports = app => {
  app.use('/api', router)
  fg.sync('**/src/main/routes/**routes.js').forEach(filePath => {
    filePath = path.join('..', '..', '..', filePath)
    require(filePath)(router)
  })
}
