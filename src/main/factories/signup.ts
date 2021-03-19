import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentations/controller/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSigUpController = (): SignUpController => {
  const emailValidatorAdapdter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  return new SignUpController(emailValidatorAdapdter, dbAddAccount)
}
