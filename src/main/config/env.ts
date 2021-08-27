export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.MONGO_URL || 5050,
  jwtSecret: process.env.JWT_SECRET || 'chave12345'
}
