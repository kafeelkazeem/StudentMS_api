import mongoose from "mongoose"

const Schema = mongoose.Schema

const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    cls: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    parentName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paid: {
        type: String,
        required: true
    },
    owing: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Student', StudentSchema)