import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })
  test('should recconect if mongodb is down', async () => {
    const accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
