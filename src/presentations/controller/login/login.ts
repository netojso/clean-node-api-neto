import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamsError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) return new Promise(resolve => resolve(badRequest(new MissingParamsError('email'))))

      if (!password) return new Promise(resolve => resolve(badRequest(new MissingParamsError('password'))))

      if (!this.emailValidator.isValid(email)) return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
