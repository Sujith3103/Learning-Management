const { authenticateMiddleware } = require("../../middleware/auth_middleware")
const Course = require("../../models/Course");
const Lecture = require("../../models/Lecture");
const Lecture_ = require("../../models/Lecture")
const User = require("../../models/User")

const addNewCourse = async (req, res) => {
  try {
    console.log("user in course controller : ", req.user);

    const userData = await User.findById(req.user.id);
    if (!userData || userData.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized to create a course"
      });
    }

    const { Lecture: LectureData, ...CourseData } = req.body;

    CourseData.instructor = req.user.id;

    const savedCourse = await Course.create(CourseData);

    const Lecture_Id = [];

    for (const item of LectureData) {
      const lecture_data = await Lecture_.create(item);
      Lecture_Id.push(lecture_data._id);
    }

    savedCourse.lectures.push(...Lecture_Id);
    await savedCourse.save();

    console.log("Final Course with lectures:", savedCourse);

    res.status(200).json({
      success: true,
      message: "The Course was Created",
      data: {
        course: savedCourse
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error while creating course"
    });
  }
};

const getCourseDetails = async (req, res) => {

  const { id } = req.params

  try {
    const courseDetails = await Course.findById(id)

    if (courseDetails) {

      const lectureId = courseDetails.lectures
      const lectureDetails = []

      for (const item of lectureId) {
        const fetched_lecture_details = await Lecture.findById(item)
        lectureDetails.push(fetched_lecture_details)
      }

      const updatedCourseDetails = {
        ...courseDetails.toObject(),
        lectures: lectureDetails
      }

      console.log("Updated Course Details : ", updatedCourseDetails)

      res.status(200).json({
        success: true,
        message: "course details fetched successfully",
        data: updatedCourseDetails
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Error in "
    })
  }
}
const getAllCoursesById = async (req, res) => {
  try {

    const userId = req.user.id
    const courseData = await Course.find({ instructor: userId })

    const updatedData = courseData.map((data) => (
      {
        id: data.id,
        title: data.title,
        pricing: data.pricing,
        students: [...data.students]
      }
    ))

    console.log(updatedData)

    res.status(200).json({
      success: true,
      message: "fetched the courses of instructor",
      data: updatedData

    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Error in "
    })
  }
}
const updateCourseById = async (req, res) => {
  try {

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Error in "
    })
  }
}

module.exports = { addNewCourse, getCourseDetails, getAllCoursesById, updateCourseById }