import express from 'express'
import { postChangePassword, postLogin } from '../controllers/auth.js'
import { body } from 'express-validator'
import { authenticateJWT } from '../middlewares/authJWT.js'

const router = express.Router()

const valLogin = [
    body('username').notEmpty().trim(),
    body('password').notEmpty().trim()
]

const valPassword = [
    body('oldPassword').notEmpty().trim(),
    body('newPassword').notEmpty().trim().isAlphanumeric().isLength({min: 5}).isAlphanumeric(),
]

router.post('/login', valLogin, postLogin)
router.post('/changePassword', authenticateJWT, valPassword, postChangePassword)

export default router