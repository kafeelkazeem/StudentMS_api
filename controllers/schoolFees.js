import { validationResult } from "express-validator"
import Fees from '../models/fees.js'

export const setScoolFees = async (req, res, next) =>{
    const {section, amount} = req.body
    const err = validationResult(req)
    if(!err.isEmpty()){
        console.log(err)
        return res.status(400).json({error: 'An error occured'})
    }
    try {
        const updatedFees = await Fees.findOneAndUpdate({section: section}, {amount: amount}, {upsert: true})
        return res.status(201).json({message: 'updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'an error occured'})
    }
}

export const getSchoolFees = async (req, res, next) => {
    try {
        const sections = ['nursery', 'primary', 'juniorSecondary', 'seniorSecondary'];
        const fees = await Fees.find({ section: { $in: sections } }).select('section amount');
        const feeMap = {};
        fees.forEach(fee => {
            feeMap[`${fee.section}`] = fee.amount;
        });
        return res.status(200).json(feeMap);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}
