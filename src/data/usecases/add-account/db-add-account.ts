import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { AccountModel, AddAccount, AddAccountModel, Hasher } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  constructor (private readonly Hasher: Hasher, private readonly addAccountRepository: AddAccountRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.Hasher.hash(accountData.password)

    const newAccount = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword }))

    return newAccount
  }
}
