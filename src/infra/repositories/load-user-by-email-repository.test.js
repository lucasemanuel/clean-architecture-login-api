const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
let db, client

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await client.db()
  })
  beforeEach(async () => {
    db.collection('users').deleteMany()
  })
  afterAll(async () => {
    await client.close()
  })
  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load()
    expect(user).toBeNull()
  })
  test('Should an return user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = (
      await userModel.insertOne({
        email: 'valid_email@email.com',
        password: 'hashed_password'
      })
    ).ops[0]
    const user = await sut.load('valid_email@email.com')
    expect(user).toEqual({
      _id: fakeUser._id,
      password: fakeUser.password
    })
  })
})
