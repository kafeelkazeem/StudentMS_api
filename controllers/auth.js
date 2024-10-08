import Admin from '../models/admin.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';

const jwtSecret = process.env.TOKENSECRET

export const postLogin = async (req, res, next) =>{

    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(401).json({error: error.array()})
    }
    const {username, password} = req.body
    try {
        const admin = await Admin.findOne({username: username})
        if(!admin){
            return res.status(400).json({error: 'invalid username or password'})
        }
        const isPassword = await bcrypt.compare(password, admin.password)
        if(!isPassword){
            return res.status(400).json({error: 'invalid username or password'})
        }
        const token = jwt.sign({id: admin._id, username: username}, jwtSecret, {expiresIn: '7h'})
        return res.status(200).json({token: token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'an error occured'})
    }
} 

export const postChangePassword = async (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log(error)
        return res.status(400).json({error: error.array()})
    }
    const {currentPassword, newPassword} = req.body;
    try {
        const admin = await Admin.findById(req.user.id)
        
        const isCurrentPassword = await bcrypt.compare(currentPassword, admin.password)
        if(!isCurrentPassword){
            return res.status(400).json({message: 'Old password incorrect'})
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await Admin.findByIdAndUpdate(req.user.id, {password: hashedPassword}, {runValidators: true})

        return res.status(201).json({message: 'Password changed succesfully'})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'an error occured'})
    }
}