const { authenticateMiddleware } = require("../../middleware/auth_middleware")
const Course = require("../../models/Course");
const Lecture = require("../../models/Lecture");
// const Lecture_ = require("../../models/Lecture")
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
      const lecture_data = await Lecture.create(item);
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
    const courseDetails = await Course.findById(id).populate([
      {
        path: "instructor",
        select: "userName userEmail"
      },
      {
        path: "lectures",
      }
    ])

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
      message: "Error in fetching the course details"
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

  const { id } = req.params
  const data_to_update = req.body
  const Lecture_to_update = req.body.Lecture
  console.log("body : ", req.body)

  const InstructorId = req.user

  try {
    const course_Data = await Course.findById(id)

    if (InstructorId.id === course_Data.instructor.toString()) {

      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { $set: data_to_update },
        { new: true }
      );
      // console.log("lecture to update : ", Lecture_to_update)

      const Lecture_Id = []
      for (const item of Lecture_to_update) {
        const is_Lecture = await Lecture.findById(item._id)
        if (!is_Lecture) {
          const updatedLecture = await Lecture.create(item)
          console.log("Updated lecture : ", updatedLecture)
          Lecture_Id.push(updatedLecture._id)
        }
        else {
          console.log("ID lec : ", item._id)
          const updated_lecture = await Lecture.findByIdAndUpdate(item._id,item)
          Lecture_Id.push(item._id)
        }

      }
      console.log("LEcture id :", Lecture_Id)
      updatedCourse.lectures = Lecture_Id
      updatedCourse.save()
      console.log("updated data: ", updatedCourse)

      if (updatedCourse) {
        res.status(200).json({
          success: true,
          message: "course was updated successfully",
          data: updatedCourse
        })
      }
    }

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Error in updating the course"
    })
  }
}

module.exports = { addNewCourse, getCourseDetails, getAllCoursesById, updateCourseById }