const express = require('express')
const { Student_getAllCourses, Student_BoughtCourses, Student_getAll_BoughtCourses } = require('../../controllers/student_controller')
const { authenticateMiddleware } = require('../../middleware/auth_middleware')

const router = express.Router()

router.get('/get',authenticateMiddleware,Student_getAllCourses)

router.get('/get-all-mycourses',authenticateMiddleware,Student_getAll_BoughtCourses)

router.get('/get-mycourses',authenticateMiddleware,Student_BoughtCourses)

module.exports = router