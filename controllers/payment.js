import Payment from '../models/payment.js'
import Student from '../models/student.js'
import { validationResult } from 'express-validator'

const fees = 10000

export const postMakePayment = async (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log(error)
        return res.status(422).json({error: error.array()})
    }
    try {
        const {payerName, phoneNumber, date, amountPaid, paidTo} = req.body
        const payment = new Payment({payerName: payerName, phoneNumber: phoneNumber, paidTo: paidTo, amountPaid: amountPaid, date: date})
        await payment.save();

        const owingAmount =  await Student.findById(paidTo).select('owing')
        if(amountPaid - owingAmount.owing == 0){
            await Student.findByIdAndUpdate(paidTo, {owing: 0}, {new: true, runValidators: true})
        }else if (amountPaid - owingAmount.owing > 0){
            await Student.findByIdAndUpdate(paidTo, {owing: amountPaid - owingAmount.owing}, {new: true, runValidators: true})
        }
        
        return res.status(201).json({message: 'succefully paid'})
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