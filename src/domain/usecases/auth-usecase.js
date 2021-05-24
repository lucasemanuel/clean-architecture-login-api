const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor (loadUserByEmailRepository, encrypter, tokenGenerator) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  loadUserByEmailRepositoryIsValid () {
    if (!this.loadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository')
    }
    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamError('loadUserByEmailRepository')
    }
  }

  async auth (email, password) {
    if (!email) throw new MissingParamError('email')
    if (!password) throw new MissingParamError('password')
    this.loadUserByEmailRepositoryIsValid()

    const user = await this.loadUserByEmailRepository.load(email)
    if (!user) return null

    const isValid = await this.encrypter.compare(password, user.password)
    if (!isValid) return null

    await this.tokenGenerator.generate(user.id)
  }
}
