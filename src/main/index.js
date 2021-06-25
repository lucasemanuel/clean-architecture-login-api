const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {})
  .catch(console.error)

const app = require('./config/app')
app.listen(3333, () => console.log('Server Running!'))
