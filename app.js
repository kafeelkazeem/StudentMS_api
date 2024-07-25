import 'dotenv/config.js';
import express from 'express'
import mongoose from 'mongoose';
import StudentRoute from './routes/appRoutes.js'
import PaymentRoute from './routes/payment.js'
import cors from 'cors'
import Admin from './models/admin.js'

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

async function seedAdmin() {
    try {
      const adminData = {
        username: 'johndoe',
        password: '1234', 
        role: 'admin',
      };
      const existingAdmin = await Admin.findOne({ username: adminData.username });
      if (!existingAdmin) {
        const admin = new Admin(adminData);
        await admin.save();
        console.log('Admin account seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding admin:', error);
    }
  }
  seedAdmin();

app.listen(PORT, ()=> console.log('running on port', PORT))