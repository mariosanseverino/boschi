import { Router } from 'express'
import loginRouter from './loginRouter'
import registerRouter from './registerRouter'
import productsRouter from './productsRouter'

const router = Router()

router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/products', productsRouter)

export default router
