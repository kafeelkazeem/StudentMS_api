import argon2 from 'argon2'
import mongoose from "mongoose"

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
      try {
        this.password = await argon2.hash(this.password);
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
  
  // Method to verify password during login
  AdminSchema.methods.verifyPassword = async function (inputPassword) {
    return await argon2.verify(this.password, inputPassword);
  };

export default mongoose.model('Admin', AdminSchema)