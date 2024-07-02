const express =  require('express')
const router = express.Router()
const studentController = require('../controllers/student')

router.get('/getDashBoard', studentController.getDashBoard)
router.get('/getAllStudentPerClass', studentController.getAllStudentsPerClass)

module.exports = router