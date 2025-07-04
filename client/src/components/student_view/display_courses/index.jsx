import { StudentContext } from "@/context/student_context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export const DisplayCourseData = ({ courseData, }) => {

    const { studentBoughtCoursesData, setstudentBoughtCoursesData } = useContext(StudentContext)

    const Lecture_len = courseData.lectures.length

    const navigate = useNavigate()

    const handleClick = () => {
        const idSet = new Set()
        studentBoughtCoursesData.map(c => idSet.add(c.courseId))
        console.log(idSet,courseData._id)
        if (idSet.has(courseData._id) ){
            navigate(`/course-progress/${courseData._id}`)
        }
        else {
            navigate(`/courses/details/${courseData._id}`)
        }

    }

    return (
        <div className="flex">
            <img src={courseData.image} alt="" className="w-50" onClick={handleClick} />
            <div>
                <h1>{courseData.title}</h1>
                <p>Created By {courseData.instructor.userName}</p>

                <p><span>Lectures {Lecture_len}</span> - {courseData.level} Level</p>

                <span>${courseData.pricing}</span>
            </div>
        </div>
    )
}