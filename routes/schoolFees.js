import express from 'express'
import {getSchoolFees, setScoolFees} from '../controllers/schoolFees.js'
import { body } from 'express-validator'
import { authenticateJWT } from '../middlewares/authJWT.js'

const router = express.Router()

const schoolFeesVal = [
    body('amount').notEmpty().isNumeric(),
    body('section').notEmpty()
]

router.post('/setSchoolFees', authenticateJWT, schoolFeesVal, setScoolFees)

router.get('/getSchoolFees', authenticateJWT, getSchoolFees)

export default router