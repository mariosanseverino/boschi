import dotenv from 'dotenv'

dotenv.config()

import App from './app'

const port = 3001
const app = new App()

app.start(port)
