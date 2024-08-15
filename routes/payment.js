import express from 'express'
import { getPaymentHistory, postMakePayment } from '../controllers/payment.js'
import {body} from 'express-validator'
import { authenticateJWT } from '../middlewares/authJWT.js'

const router = express.Router()

const paymentValidation = [
    body('payerName').trim().notEmpty(),
    body('paidTo').isMongoId().notEmpty(),
    body('amountPaid').isNumeric().notEmpty(),
    body('date').isDate(),
]

router.post('/makePayment', authenticateJWT, paymentValidation, postMakePayment)

router.get('/getPaymentHistory', authenticateJWT, getPaymentHistory)

export default router