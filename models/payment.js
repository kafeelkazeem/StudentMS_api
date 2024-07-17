import mongoose from "mongoose"

const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    NamePayer : {
        type: String,
        required: true,
    },
    phoneNumber : {
        type: String
    },
    amount : {
        type: Number,
        required: true,
    },
    date : {
        type: Date
    },
    student : {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Payment', PaymentSchema)