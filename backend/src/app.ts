import express from 'express'
import cors from 'cors'
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
		this.app.use(cors({
			allowedHeaders: ['*', 'Content-Type', 'Authorization']
		}))
	
		this.app.use(express.json())
	}
	
	public start(PORT: string | number): void {
		this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
	}
}

export default App
