module.exports = class ServerError extends Error {
  constructor (paramName) {
    super('Server Error')
    this.name = 'ServerError'
  }
}
