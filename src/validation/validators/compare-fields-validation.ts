import { InvalidParamError } from '../../presentations/errors'
import { Validation } from '../../presentations/protocols'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldNameToCompare: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldNameToCompare]) {
      return new InvalidParamError(this.fieldNameToCompare)
    }
  }
}
