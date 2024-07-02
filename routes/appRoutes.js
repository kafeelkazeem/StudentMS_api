const express =  require('express')
const router = express.Router()
const studentController = require('../controllers/student')

router.get('/getDashBoard', studentController.getDashBoard)


module.exports = router