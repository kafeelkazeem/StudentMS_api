import express from 'express'
import { postLogin } from '../controllers/auth.js'
import { body } from 'express-validator'

const router = express.Router()

const valLogin = [
    body('username').notEmpty().trim(),
    body('password').notEmpty().trim()
]

router.post('/login', valLogin, postLogin)

export default router