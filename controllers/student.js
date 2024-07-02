const Student = require('../models/student')

exports.getDashBoard = (req, res, next) =>{
    let totalStudent;
    let totalStudentPaid;
    let totalStudentNotPaid;
    let totalStudentOwing;
    let primary1, primary2, primary3, primary4, primary5

    Student.find()
    .then(result =>{
        totalStudent = result.length
        return  Student.find({status: 'paid'})
    })
    .then(result =>{
        totalStudentPaid = result.length
        return Student.find({status: 'not paid'})
    })
    .then(result =>{
        totalStudentNotPaid = result.length
        return Student.find({status: 'owing'})
    })
    .then(result =>{
        totalStudentOwing = result.length
        return Student.find({class: 'primary 1'})
    })
    .then(result =>{
        primary1 = result.length
        return Student.find({class: 'primary 2'})
    })
    .then(result =>{
        primary2 = result.length
        return Student.find({class: 'primary 3'})
    })
    .then(result =>{
        primary3 = result.length
        return Student.find({class: 'primary 4'})
    })
    .then(result =>{
        primary4 = result.length
        return Student.find({class: 'primary 5'})
    })
    .then(result =>{
        primary5 = result.length
        res.json({
            totalStudent: totalStudent, 
            totalStudentPaid: totalStudentPaid, 
            totalStudentNotPaid: totalStudentNotPaid, 
            totalStudentOwing: totalStudentOwing,
            primaryBarChartData: [primary1, primary2, primary3, primary4, primary5],
            pieChart: [totalStudentPaid, totalStudentOwing, totalStudentNotPaid] 
        })
    })
    .catch(err =>{
        console.log(err)
    })
}