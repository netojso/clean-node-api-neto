import { Collection, MongoClient } from 'mongodb'

interface MongoHelperTypes {
  client: MongoClient | null
  connect: (uri: string) => Promise<void>
  disconnect: () => Promise<void>
  getCollection: (name: string) => Collection
}

export const MongoHelper: MongoHelperTypes = {
  client: null,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
