import { EmailValidation } from '../../../presentations/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentations/helpers/validators/required-field-validation'
import { Validation } from '../../../presentations/protocols/validation'
import { ValidationComposite } from '../../../presentations/helpers/validators/validation-composite'
import { EmailValidator } from '../../../presentations/protocols'
import { makeLoginValidation } from './signup-validation'

jest.mock('../../../presentations/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
