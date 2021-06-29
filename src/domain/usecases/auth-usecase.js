const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor ({
    loadUserByEmailRepository,
    updateAccessTokenRepository,
    encrypter,
    tokenGenerator
  } = {}) {
    this.updateAccessTokenRepository = updateAccessTokenRepository
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
    const isValid =
      user && (await this.encrypter.compare(password, user.password))

    if (isValid) {
      const accessToken = await this.tokenGenerator.generate(user._id)
      await this.updateAccessTokenRepository.update(user._id, accessToken)
      return accessToken
    }

    return null
  }
}
