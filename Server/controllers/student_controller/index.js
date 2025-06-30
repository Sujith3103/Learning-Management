import Course from "../../models/Course.js"


export const Student_getAllCourses = async(req,res) => {

    const courses = await Course.find({category: "web-development"}).populate({
        path: "instructor",
        select: "userName userEmail"
    })

    courses? res.status(200).json({
        success: true,
        message: "fetched successfully",
        data: courses
    }) : null
}