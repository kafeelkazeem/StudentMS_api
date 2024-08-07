import express from 'express'
import {setScoolFees} from '../controllers/schoolFees.js'
import { body } from 'express-validator'

const router = express.Router()

const schoolFeesVal = [
    body('fees').notEmpty().isNumeric(),
    body('section').notEmpty()
]

router.post('/setSchoolFees', schoolFeesVal, setScoolFees)

export default router