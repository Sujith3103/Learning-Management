const express = require('express')

const { addNewCourse, getAllCoursesById, getCourseDetails, updateCourseById } = require('../../controllers/instructor_controller/course_controller')

const router = express.Router()

router.post('/add', addNewCourse)
router.get('/get/:id', getAllCoursesById)
router.get('/get/details/:id', getCourseDetails)
router.put('/update', updateCourseById)

module.exports = router