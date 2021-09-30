export class AccessDeniedError extends Error {
  constructor () {
    super('AccessDenied')
    this.name = 'AccessDeniedError'
  }
}
