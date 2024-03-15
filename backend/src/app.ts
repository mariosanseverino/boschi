import express, { Request, Response, NextFunction } from 'express'
import router from './routes'

class App {
	public app: express.Express

	constructor() {
		this.app = express()

		this.config()

		this.app.use(express.json())
		this.app.use(router)
	}

	private config():void {
		const accessControl: express.RequestHandler = (req: Request, res: Response, next: NextFunction) => {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH')
			res.header('Access-Control-Allow-Headers', '*')
			next()
		}
    
		this.app.use(accessControl)
	}

	public start(PORT: string | number): void {
		this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
	}
}

export default App
