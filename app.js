const express = require('express')
const PORT = 8080

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

app.use('/', (req, res, next) =>{
    res.send('hi from node js')
})

app.listen(PORT, ()=> console.log('running on port 8080'))