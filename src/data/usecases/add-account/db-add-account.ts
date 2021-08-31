import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { AccountModel, AddAccount, AddAccountModel, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  constructor (
    private readonly Hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.Hasher.hash(accountData.password)

      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword }))

      return newAccount
    }
    return null
  }
}
