import Course from "../../models/Course.js"
import StudentCourse from "../../models/StudentCourse.js";

export const Student_getAllCourses = async (req, res) => {
    try {
        const { category, level, language } = req.query;

        const filter = {};

        if (category) {
            filter.category = { $in: category.split(",") };
        }

        if (level) {
            filter.level = { $in: level.split(",") };
        }

        if (language) {
            filter.primaryLanguage = { $in: language.split(",") };
        }

        console.log("Final filter: ", filter);

        let courses
        if (category || level || language) {
                courses = await Course.find(filter).populate({
                path: "instructor",
                select: "userName userEmail"
            });
        }


        console.log(courses)

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: courses
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const Student_BoughtCourses = async(req,res) => {
    const {user} = req

    console.log("user for my course : ",user)

    try{
        const user_Courses = await StudentCourse.findById(user.id)

        if(!user_Courses){
            return res.status(404).json({
                success : false,
                message : "Error in fetching user courses"
            })
        }

        console.log("user courses : ",user_Courses)

        res.status(200).json({
            success : true,
            message : "user courses fetched successfully"
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message: "error in getting my-course"
        })
    }
}
