import { Request, Response } from 'express'
import { ServiceCodes } from '../interfaces/ServiceResponse';
import LoginService from '../services/LoginService';

export default class LoginController {
    constructor(
        private loginService = new LoginService(),
    ) {}

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const serviceResponse = await this.loginService.login(email, password);
        const { status, data: token } = serviceResponse;
        return res.status(ServiceCodes[status]).json(token);
    }
}
