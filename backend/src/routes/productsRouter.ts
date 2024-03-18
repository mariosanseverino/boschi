import { Request, Response, Router } from 'express'
import ProductsController from '../controllers/ProductsController'
import JWTValidation from '../middlewares/JWTValidation'
import ProductsValidation from '../middlewares/ProductsValidation'

const productsController = new ProductsController()

const productsRouter = Router()

productsRouter.get(
	'/',
	JWTValidation.verifyJWT,
	(req: Request, res: Response) => productsController.get(req, res)
)

productsRouter.get(
	'/:id',
	JWTValidation.verifyJWT,
	(req: Request, res: Response) => productsController.getById(req, res)
)

productsRouter.post(
	'/',
	JWTValidation.verifyJWT,
	ProductsValidation.verifyCreate,
	(req: Request, res: Response) => productsController.create(req, res)
)

productsRouter.put(
	'/:id',
	JWTValidation.verifyJWT,
	ProductsValidation.verifyUpdate,
	(req: Request, res: Response) => productsController.update(req, res)
)

productsRouter.delete(
	'/:id',
	JWTValidation.verifyJWT,
	
)

export default productsRouter
