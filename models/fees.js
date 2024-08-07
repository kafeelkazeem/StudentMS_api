import mongoose from "mongoose"

const Schema = mongoose.Schema

const FeesSchema = new Schema({
    section : {
        type: String,
        required: true,
    },
    amount : {
        type: Number,
        required: true
    }
}, {timestamps: true})


export default mongoose.model('Fees', FeesSchema)