import Course from "../../models/Course.js"

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

        const courses = await Course.find(filter).populate({
            path: "instructor",
            select: "userName userEmail"
        });

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
