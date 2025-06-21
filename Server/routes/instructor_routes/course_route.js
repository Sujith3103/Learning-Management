const express = require('express')

const { addNewCourse, getAllCoursesById, getCourseDetails, updateCourseById } = require('../../controllers/instructor_controller/course_controller')
const { authenticateMiddleware } = require('../../middleware/auth_middleware')

const router = express.Router()

router.post('/add',authenticateMiddleware, addNewCourse)
router.get('/get',authenticateMiddleware,getAllCoursesById)
router.get('/get/details/:id', getCourseDetails)
router.put('/update/:id',authenticateMiddleware, updateCourseById)

module.exports = router