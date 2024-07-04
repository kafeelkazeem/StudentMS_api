const express =  require('express')
const router = express.Router()
const studentController = require('../controllers/student')
const testing = require('../middlewares/testing')

router.get('/getDashBoard', studentController.getDashBoard)
router.get('/getAllStudentPerClass', studentController.getAllStudentsPerClass)
router.get('/testing', testing, studentController.getDashBoard)

module.exports = router