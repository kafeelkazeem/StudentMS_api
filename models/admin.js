import argon2 from 'argon2'
import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const AdminSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'admin',
    }
}, {timestamps: true})
  
  AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

export default mongoose.model('Admin', AdminSchema)