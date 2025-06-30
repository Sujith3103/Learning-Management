const express = require('express')
const { Student_getAllCourses } = require('../../controllers/student_controller')

const router = express.Router()

router.get('/get',Student_getAllCourses)

module.exports = router