import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentations/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const { statusCode, body } = await controller.handle(httpRequest)

    res.status(statusCode).json(body)
  }
}
