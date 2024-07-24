import mongoose from "mongoose"

const Schema = mongoose.Schema

const AdminSchema = new Schema({
    userName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Admin', AdminSchema)