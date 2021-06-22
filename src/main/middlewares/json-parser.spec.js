const request = require('supertest')
const app = require('../config/app')

describe('JSON Parser Middleware', () => {
  test('Should parse body as JSON', async () => {
    app.post('/test_json_parser', (req, res) => res.send(req.body))

    const data = { age: '23' }
    const response = await request(app)
      .post('/test_json_parser')
      .send(data)

    expect(response.body).toEqual(data)
  })
})
