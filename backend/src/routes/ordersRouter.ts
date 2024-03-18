import { Request, Response, Router } from 'express'
import JWTValidation from '../middlewares/JWTValidation'
import OrdersController from '../controllers/OrdersController'

const ordersController = new OrdersController()

const ordersRouter = Router()

ordersRouter.post(
	'/',
	JWTValidation.verifyJWT,
	(req: Request, res: Response) => ordersController.create(req, res)
)

export default ordersRouter
