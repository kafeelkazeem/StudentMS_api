import Student from '../models/student.js'

export const getDashBoard = async (req, res, next) =>{
    try {
        const totalStudent = await Student.countDocuments()
        const totalStudentPaid = await Student.countDocuments({status: 'paid'})
        const totalStudentOwing = await Student.countDocuments({status: 'owing'})
        const totalStudentNotPaid = await Student.countDocuments({status: 'not paid'})

        const classes = ['primary 1', 'primary 2', 'primary 3', 'primary 4', 'primary 5']

        const classesNo = await Promise.all(
            classes.map(async cls => {
              const count = await Student.countDocuments({ class: cls });
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
        const student = await Student.find({ class: cls }).select('firstName lastName gender status paid owing')
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