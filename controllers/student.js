import Student from '../models/student.js'
import Fees from '../models/fees.js'
import { validationResult } from 'express-validator'

export const getDashBoard = async (req, res, next) =>{
    try {
        const totalStudent = await Student.countDocuments()
        const totalStudentPaid = await Student.countDocuments({status: 'paid'})
        const totalStudentOwing = await Student.countDocuments({status: 'owing'})
        const totalStudentNotPaid = await Student.countDocuments({status: 'not paid'})

        const countCls = async (cl) =>{
            return await Promise.all(
                cl.map(async cls =>{
                    const count = await Student.countDocuments({cls: cls});
                    return count
                })
            )
        }

        const nurseryCls = ['playGroup', 'preNursery', 'nursery 1', 'nursery 2']
        const primaryCls = ['primary 1', 'primary 2', 'primary 3', 'primary 4', 'primary 5']
        const secondaryCls = ['jss 1', 'jss 2', 'jss 3', 'sss 1', 'sss 2', 'sss 3']

        const nurseryClassesNo = await countCls(nurseryCls)
        const primaryClassesNo = await countCls(primaryCls)
        const secondaryClassesNo = await countCls(secondaryCls)
   
        return res.status(200).json({
            totalStudent: totalStudent, 
            totalStudentPaid: totalStudentPaid, 
            totalStudentNotPaid: totalStudentNotPaid, 
            totalStudentOwing: totalStudentOwing,
            nurseryBarChartData: nurseryClassesNo,
            primaryBarChartData: primaryClassesNo,
            secondaryBarChartData: secondaryClassesNo 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'An error occurred' });
    }
} 

export const getAllStudentsPerClass = async (req, res, next) =>{
    try {
        const cls = req.query.cls
        const student = await Student.find({ cls: cls }).select('firstName lastName gender status paid owing')
        const transformedResult = student.map(doc => {
            const { _id, ...rest } = doc.toObject();
            return { id: _id, ...rest };
        });
        return res.status(200).json(transformedResult);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'An error occurred' });
    }
} 

export const postAddStudent = async (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log(error)
        return res.status(422).json({error: error.array()}) 
    }
    try {
        const fees = await Fees.findOne({section: req.body.section}).select('amount')
        let owing
        const status = () =>{
            if(req.body.paid == 0){
                owing = fees.amount
                return 'not paid';
            }else if(req.body.paid < fees.amount){
                owing = fees.amount - req.body.paid
                return 'owing';
            }else{
                owing = 0
                return 'paid'
            }
        }
        const studentObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            cls: req.body.cls,
            section: req.body.section,
            gender: req.body.gender,
            parentName: req.body.parentName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            status: status(),
            paid: req.body.paid,
            owing: owing
        }
        const student = new Student(studentObj)
        const createdStudent = await student.save()
        console.log(createdStudent)
        return res.status(201).json({message: 'new student created'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'something went wrong'})
    }
}

export const getSingleStudent = async (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({error: error.array()})
    }
    const id = req.query.id
    if(!id){
        return res.status(422).json({error: 'invalid student'})
    }
    try {
        const student = await Student.findById(id)
        return res.status(200).json(student)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: 'Student not found'})
    }
}