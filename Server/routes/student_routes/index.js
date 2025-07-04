const express = require('express')
const { Student_getAllCourses, Student_BoughtCourses } = require('../../controllers/student_controller')
const { authenticateMiddleware } = require('../../middleware/auth_middleware')

const router = express.Router()

router.get('/get',authenticateMiddleware,Student_getAllCourses)

router.get('/get-mycourses',authenticateMiddleware,Student_BoughtCourses)

module.exports = router