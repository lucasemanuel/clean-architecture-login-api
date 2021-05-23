class AuthUseCase {
  async auth (email) {
    if (!email) throw new Error()
  }
}

describe('Auth Usecase', () => {
  test('Should return null if no email is provided', () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow()
  })
})
