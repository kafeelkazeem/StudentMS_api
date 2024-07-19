import mongoose from "mongoose"

const Schema = mongoose.Schema

const FeesSchema = new Schema({
    amount : {
        type: Number,
        required: true
    },
    section : {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Fees', FeesSchema)