import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'

interface SutTypes {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()

  return { sut }
}

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
