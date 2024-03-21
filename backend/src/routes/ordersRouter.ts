import { Request, Response, Router } from 'express'
import JWTValidation from '../middlewares/JWTValidation'
import OrdersController from '../controllers/OrdersController'
import OrderValidation from '../middlewares/OrderValidation'

const ordersController = new OrdersController()

const ordersRouter = Router()

ordersRouter.post(
	'/',
	OrderValidation.validateOrder,
	JWTValidation.verifyJWT,
	(req: Request, res: Response) => ordersController.create(req, res)
)

ordersRouter.put(
	'/:id',
	OrderValidation.validateUpdate,
	JWTValidation.verifyJWT,
	(req: Request, res: Response) => ordersController.update(req, res)
)

ordersRouter.get(
	'/',
	JWTValidation.verifyJWT,
	(req: Request, res: Response) => ordersController.get(req, res)
)

ordersRouter.get(
	'/:id',
	OrderValidation.validateId,
	JWTValidation.verifyJWT,
	(req: Request, res: Response) => ordersController.getById(req, res)
)

export default ordersRouter
