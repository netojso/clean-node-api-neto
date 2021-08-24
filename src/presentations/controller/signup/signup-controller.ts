import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { Controller, HttpResponse, HttpRequest, AddAccount } from './signup-controller-protocols'

export class SignUpController implements Controller {
  private readonly validation: Validation
  private readonly addAccount: AddAccount

  constructor (addAccount: AddAccount, validation: Validation) {
    this.validation = validation
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
