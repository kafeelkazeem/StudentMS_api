import express from 'express'
import { getPaymentHistory, postMakePayment } from '../controllers/payment.js'
import {body} from 'express-validator'

const router = express.Router()

const paymentValidation = [
    body('payerName').trim().notEmpty(),
    body('paidTo').isMongoId().notEmpty(),
    body('amountPaid').isNumeric().notEmpty(),
    body('date').isDate(),
]

router.post('/makePayment', paymentValidation, postMakePayment)

router.get('/getPaymentHistory', getPaymentHistory)

export default router