import { AccountModel, AddAccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeFakeAccount = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})
interface SubTypes {
  sut: DbAddAccount
  HasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SubTypes => {
  const HasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAddAccount(HasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    HasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, HasherStub } = makeSut()

    const hashSpy = jest.spyOn(HasherStub, 'hash')
    await sut.add(makeFakeAccount())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Hasher throws', async () => {
    const { sut, HasherStub } = makeSut()

    jest.spyOn(HasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    }

    await sut.add(account)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeFakeAccount())
    await expect(promise).rejects.toThrow()
  })

  test('should return an account on succes', async () => {
    const { sut } = makeSut()

    const account = await sut.add(makeFakeAccount())

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should return null if LoadAccountByEmailRepostory find an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      })))

    const account = await sut.add(makeFakeAccount())

    expect(account).toBeNull()
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeAccount())
    expect(loadSpy).toHaveBeenCalledWith('valid_email')
  })
})
