module.exports = {
  token: 'any_token',

  async sign (payload, secret) {
    return this.token
  }
}
