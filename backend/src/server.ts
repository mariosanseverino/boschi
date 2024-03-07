import dotenv from 'dotenv'

dotenv.config()

import app from './app';

const port = 3001

app.start(port)
