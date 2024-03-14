import { Request, Response, Router } from 'express'
import ProductsController from '../controllers/ProductsController'
import JWTValidation from '../middlewares/JWTValidation'

const productsController = new ProductsController()

const productsRouter = Router()

productsRouter.get(
    '/',
    JWTValidation.verifyJWT,
    (req: Request, res: Response) => productsController.get(req, res)
)

export default productsRouter
