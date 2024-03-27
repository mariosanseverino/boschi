import dotenv from 'dotenv'

dotenv.config()

import App from './app'

const port = 5433
const app = new App()

app.start(port)
