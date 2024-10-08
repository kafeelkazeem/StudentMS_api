import 'dotenv/config.js';
import express from 'express'
import mongoose from 'mongoose';
import StudentRoute from './routes/appRoutes.js'
import PaymentRoute from './routes/payment.js'
import AuthRoute from './routes/auth.js'
import FeesRoute from './routes/schoolFees.js'
import cors from 'cors'
import Admin from './models/admin.js'
import { createInitialFees } from './util/helpers.js';

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', AuthRoute)
app.use('/api', StudentRoute)
app.use('/api', PaymentRoute)
app.use('/api', FeesRoute)

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

mongoose.connect(DATABASE_URI)
.then(res =>{
  console.log('connected')
  seedAdmin()
  createInitialFees()
})
.catch(err => console.log('not connected'))


app.listen(PORT, ()=> console.log('running on port', PORT))