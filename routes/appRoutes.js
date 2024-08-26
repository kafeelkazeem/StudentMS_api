import express from 'express'
import {getDashBoard, getAllStudentsPerClass, postAddStudent, getSingleStudent, getSearchStudent} from '../controllers/student.js'
import {body, query} from 'express-validator'
import { authenticateJWT } from '../middlewares/authJWT.js'

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

const searchStudentValidator = [
    query('studentName').notEmpty()
]

router.get('/getDashBoard', authenticateJWT, getDashBoard)
router.get('/getAllStudentPerClass', authenticateJWT, getAllStudentsPerClass)
router.post('/addStudent', authenticateJWT, studentValidator, postAddStudent)
router.get('/getSingleStudent', authenticateJWT, [query('id').isMongoId().withMessage('Invalid Id')], getSingleStudent)
router.get('/searchStudent', authenticateJWT, searchStudentValidator, getSearchStudent)

export default router