import { Request, Response, Router } from 'express'
import RegisterController from '../controllers/RegisterController';
import RegisterValidation from '../middlewares/RegisterValidation';

const registerController = new RegisterController();

const registerRouter = Router();

registerRouter.post(
    '/',
    RegisterValidation.verifyRegister,
    (req: Request, res: Response) => registerController.register(req, res)
)

export default registerRouter;
