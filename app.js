import 'dotenv/config.js';
import express from 'express'
import mongoose from 'mongoose';
import router from './routes/appRoutes.js'
import cors from 'cors'

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', router)

mongoose.connect(DATABASE_URI)
.then(res => console.log('connected'))
.catch(err => console.log(err))

app.listen(PORT, ()=> console.log('running on port', PORT))