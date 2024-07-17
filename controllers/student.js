import Student from '../models/student.js'
import { validationResult } from 'express-validator'

export const getDashBoard = async (req, res, next) =>{
    try {
        const totalStudent = await Student.countDocuments()
        const totalStudentPaid = await Student.countDocuments({status: 'paid'})
        const totalStudentOwing = await Student.countDocuments({status: 'owing'})
        const totalStudentNotPaid = await Student.countDocuments({status: 'not paid'})

        const classes = ['primary 1', 'primary 2', 'primary 3', 'primary 4', 'primary 5']

        const classesNo = await Promise.all(
            classes.map(async cls => {
              const count = await Student.countDocuments({ cls: cls });
              return count;
            })
        );
        res.status(200).json({
            totalStudent: totalStudent, 
            totalStudentPaid: totalStudentPaid, 
            totalStudentNotPaid: totalStudentNotPaid, 
            totalStudentOwing: totalStudentOwing,
            primaryBarChartData: classesNo, 
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred' });
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
        res.status(200).json(transformedResult);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred' });
    }
} 

export const postAddStudent = async (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        console.log(error)
        return res.status(400).json({error: error.array()}) 
    }
    try {
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
            status: req.body.status,
            paid: req.body.paid,
            owing: req.body.owing
        }
        const student = new Student(studentObj)
        const createdStudent = await student.save()
        console.log(createdStudent)
        res.status(200).json({message: 'new student created'})
    } catch (error) {
        res.status(400).json({message: 'something went wrong'})
        console.log(error)
    }
}

export const getSingleStudent = async (req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty){
        return res.status(400).json({error: error.array()})
    }
    const id = req.query.id
    try {
        const student = await Student.findById(id)
        req.student = id
        res.status(200).json(student)
        console.log(req)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: 'Student not found'})
    }
}