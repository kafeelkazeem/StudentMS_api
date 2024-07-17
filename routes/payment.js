import express from 'express'
import { postMakePayment } from '../controllers/payment.js'

const router = express.Router()

router.post('/makePayment', postMakePayment)

export default router