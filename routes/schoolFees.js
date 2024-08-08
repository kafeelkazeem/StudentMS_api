import express from 'express'
import {getSchoolFees, setScoolFees} from '../controllers/schoolFees.js'
import { body } from 'express-validator'

const router = express.Router()

const schoolFeesVal = [
    body('amount').notEmpty().isNumeric(),
    body('section').notEmpty()
]

router.post('/setSchoolFees', schoolFeesVal, setScoolFees)

router.get('/getSchoolFees', getSchoolFees)

export default router