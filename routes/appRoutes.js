import express from 'express'
import {getDashBoard, getAllStudentsPerClass} from '../controllers/student.js'

const router = express.Router()

router.get('/getDashBoard', getDashBoard)
router.get('/getAllStudentPerClass', getAllStudentsPerClass)

export default router