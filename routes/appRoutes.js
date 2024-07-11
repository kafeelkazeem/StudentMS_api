import express from 'express'
import {getDashBoard, getAllStudentsPerClass, postAddStudent} from '../controllers/student.js'
// import {body} from 'express-validator/check'

const router = express.Router()


router.get('/getDashBoard', getDashBoard)
router.get('/getAllStudentPerClass', getAllStudentsPerClass)
router.post('/addStudent', postAddStudent)

export default router