import { AccountModel } from '../../../domain/models/account'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepository implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const accountModel: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          password: 'any_password'
        }
        return new Promise(resolve => resolve(accountModel))
      }
    }

    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'test@example.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('test@example.com')
  })
})
