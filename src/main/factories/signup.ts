import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentations/controller/signup/signup'
import { Controller } from '../../presentations/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'
import { makeSigUpValidation } from './signup-validation'

export const makeSigUpController = (): Controller => {
  const emailValidatorAdapdter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapdter, dbAddAccount, makeSigUpValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
