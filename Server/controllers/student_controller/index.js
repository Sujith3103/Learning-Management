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
        const course_Ids = []
        const idSet = new Set(course_Ids)
        if (category || level || language) {
            courses = await Course.find(filter).populate({
                path: "instructor",
                select: "userName userEmail"
            });
            courses.map(c => idSet.add(c._id.toString()))
        }

        console.log("course id's: ", course_Ids)


        const my_Courses = await StudentCourse.findOne({ userId: req.user.id })
        console.log("before updating : ", my_Courses.courses)
        let updated_My_Courses = [...my_Courses.courses]
        console.log("my courses : ", updated_My_Courses)

        const Bought_Courses = updated_My_Courses.filter(c => idSet.has(c.courseId))
        console.log("ID : ", idSet)
        console.log("Bought Courses : ", Bought_Courses)
        // const updated_My_Courses = my_Courses.filter(val => )


        // console.log(courses)
        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: {courses,boughtCourses: Bought_Courses}
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const Student_BoughtCourses = async (req, res) => {
    const { user } = req

    console.log("user for my course : ", user)

    try {
        const user_Courses = await StudentCourse.findOne({ userId: user.id })

        console.log("user courses : ", user_Courses)

        res.status(200).json({
            success: true,
            message: "user courses fetched successfully",
            user_Courses
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "error in getting my-course"
        })
    }
}
