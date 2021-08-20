import { CompareFieldsValidation } from '../../presentations/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentations/helpers/validators/required-field-validation'
import { Validation } from '../../presentations/helpers/validators/validation'
import { ValidationComposite } from '../../presentations/helpers/validators/validation-composite'
import { makeSigUpValidation } from './signup-validation'

jest.mock('../../presentations/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSigUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
