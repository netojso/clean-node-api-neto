import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { serverError } from '../../presentations/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentations/protocols'
import { LogControllerDecorator } from './log-controller-decorator'

interface SutTypes {
  sut: LogControllerDecorator
  logErrorRepositoryStub: LogErrorRepository
  controllerStub: Controller
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (gttpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Octacilio'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}
const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    logErrorRepositoryStub,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same response from controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response).toEqual({
      statusCode: 200,
      body: {
        name: 'Octacilio'
      }
    }
    )
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise(resolve => resolve(serverError(fakeError))))

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
