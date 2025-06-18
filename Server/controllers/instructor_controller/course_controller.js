const Course = require('../../models/Course')

const addNewCourse = async(req,res) => {
    try{

        const courseData = req.body   
        const newlyCreatedCourse = new Course(courseData)
        const savedCourse = await newlyCreatedCourse.save()

        if(savedCourse){
            res.status(200).json({
                success: true,
                message : "Course has been created successfully",
                data:savedCourse
            })
        }

    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Error in "
        })
    }
}
const getCourseDetails = async(req,res) => {
    try{

    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Error in "
        })
    }
}
const getAllCoursesById = async(req,res) => {
    try{

    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Error in "
        })
    }
}
const updateCourseById = async(req,res) => {
    try{

    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Error in "
        })
    }
}

module.exports = {addNewCourse,getCourseDetails,getAllCoursesById,updateCourseById}