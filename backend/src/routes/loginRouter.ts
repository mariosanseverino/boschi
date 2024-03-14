import { Request, Response, Router } from 'express'
import LoginController from '../controllers/LoginController';
import LoginValidation from '../middlewares/LoginValidation';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
    '/',
    LoginValidation.verifyLogin,
    (req: Request, res: Response) => loginController.login(req, res)
)

export default loginRouter
