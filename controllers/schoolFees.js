import { validationResult } from "express-validator"
import Fees from '../models/fees.js'

export const setScoolFees = async (req, res, next) =>{
    const {section, amount} = req.body
    const err = validationResult(req)
    if(!err.isEmpty()){
        return res.status(400).json({error: 'An error occured'})
    }
    try {
        const updatedFees = await Fees.findOneAndUpdate({section: section}, {amount: amount}, {upsert: true})
        console.log(updatedFees)
        return res.status(201).json({message: 'updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'an error occured'})
    }
}