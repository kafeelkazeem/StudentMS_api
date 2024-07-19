import Payment from '../models/payment.js'
import { validationResult } from 'express-validator'

export const postMakePayment = async (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log(error)
        return res.status(422).json({error: error.array()})
    }
    try {
        const {payerName, phoneNumber, date, amountPaid, paidTo} = req.body
        const payment = new Payment({payerName: payerName, phoneNumber: phoneNumber, paidTo: paidTo, amountPaid: amountPaid, date: date})
        const paymentMade = await payment.save();
        console.log(paymentMade)
        res.status(201).json({message: 'succefully paid'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'something went wrong'})
    }
}

export const getPaymentHistory = async (req, res, next) =>{
    try {
        const studentId = req.query.id
        const Payments = await Payment.find({paidTo: studentId})
        console.log(Payments)
        res.status(200).json(Payments)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'something went wrong'})
    }
}