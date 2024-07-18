import mongoose from "mongoose"

const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    payerName : {
        type: String,
        required: true,
    },
    phoneNumber : {
        type: String
    },
    amountPaid : {
        type: Number,
        required: true,
    },
    amountOwingBeforePayment : {
        type: Number,
    },
    amountOwingAfterPayment : {
        type: Number,
    },
    date : {
        type: Date
    },
    paidTo : {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Payment', PaymentSchema)