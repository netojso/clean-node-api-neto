import { CompareFieldsValidation } from '../../../presentations/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../../presentations/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentations/helpers/validators/required-field-validation'
import { Validation } from '../../../presentations/protocols/validation'
import { ValidationComposite } from '../../../presentations/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../adapter/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
