import express from 'express'
import { postLogin } from '../controllers/auth'

const router = express.Router()

router.post('/login', postLogin)

export default router