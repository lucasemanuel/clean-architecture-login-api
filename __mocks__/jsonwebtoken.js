module.exports = {
  token: 'any_token',
  payload: '',
  secret: '',

  async sign (payload, secret) {
    this.payload = payload
    this.secret = secret

    return this.token
  }
}
