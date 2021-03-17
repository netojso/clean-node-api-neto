import express from 'express'
import setupMiddlewares from './middlewares'
import setuRoutes from './routes'

const app = express()
setupMiddlewares(app)
setuRoutes(app)

export default app
