require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const routes = require('./routes/appRoutes')

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    // Allow requests from all origins
    res.header('Access-Control-Allow-Origin', '*');
    // Allow specified headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Allow specified HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // Continue to the next middleware
    next();
});

app.use('/api', routes)

mongoose.connect(DATABASE_URI)
.then(res =>{
    app.listen(PORT, ()=> console.log('running on port 8080'))
    console.log('connected to mongoose')
    }
)
.catch(err => console.log(err))