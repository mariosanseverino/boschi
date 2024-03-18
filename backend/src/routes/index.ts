import { Router } from 'express'
import loginRouter from './loginRouter'
import registerRouter from './registerRouter'
import productsRouter from './productsRouter'
import ordersRouter from './ordersRouter'

const router = Router()

router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/products', productsRouter)
router.use('/order', ordersRouter)

export default router
