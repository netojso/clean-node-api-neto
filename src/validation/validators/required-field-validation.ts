import { MissingParamsError } from '../../presentations/errors'
import { Validation } from '../../presentations/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamsError(this.fieldName)
    }
  }
}
