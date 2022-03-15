import { AuthMiddleware } from '../../../presentations/middlewares/auth-middleware'
import { Middleware } from '../../../presentations/protocols'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token/db-load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
