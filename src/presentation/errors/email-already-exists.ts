export class EmailAlreadyExists extends Error {
  constructor () {
    super('The received email already exists')
    this.name = 'EmailAlreadyExists'
  }
}
