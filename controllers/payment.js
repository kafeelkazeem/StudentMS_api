import Payment from '../models/payment.js'

export const postMakePayment = async (req, res, next) =>{
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