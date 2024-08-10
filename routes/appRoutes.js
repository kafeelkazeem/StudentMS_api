import express from 'express'
import {getDashBoard, getAllStudentsPerClass, postAddStudent, getSingleStudent} from '../controllers/student.js'
import {body, query} from 'express-validator'

const router = express.Router()

const studentValidator = [
    body('firstName').trim().notEmpty(), 
    body('lastName').trim().notEmpty(),
    body('dob').isDate().notEmpty(),
    body('cls').notEmpty(),
    body('section').notEmpty(),
    body('gender').notEmpty().isString(),
    body('parentName').notEmpty(),
    body('paid').isNumeric(),
]

router.get('/getDashBoard', getDashBoard)
router.get('/getAllStudentPerClass', getAllStudentsPerClass)
router.post('/addStudent', studentValidator, postAddStudent)
router.get('/getSingleStudent', [query('id').isMongoId().withMessage('Invalid Id')], getSingleStudent)

export default router