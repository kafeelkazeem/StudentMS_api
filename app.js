import 'dotenv/config.js';
import express from 'express'
import mongoose from 'mongoose';
import StudentRoute from './routes/appRoutes.js'
import PaymentRoute from './routes/payment.js'
import cors from 'cors'

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

const app = express()

app.use(express.json())

app.use(cors())

app.use((req, res, next) =>{
    req.studentId = 5;
    next()
})

app.use('/api', StudentRoute)
app.use('/api', PaymentRoute)

mongoose.connect(DATABASE_URI)
.then(res => console.log('connected'))
.catch(err => console.log('not connected'))

app.listen(PORT, ()=> console.log('running on port', PORT))