import { useNavigate } from "react-router-dom"

export const DisplayCourseData = ({courseData}) => {

    const Lecture_len = courseData.lectures.length

    const navigate = useNavigate()
    
    return(
        <div className="flex">
            <img src={courseData.image} alt="" className="w-50" onClick={() => navigate(`/courses/details/${courseData._id}`)}/>
            <div>
                <h1>{courseData.title}</h1>
                <p>Created By {courseData.instructor.userName}</p>

                <p><span>Lectures {Lecture_len}</span> - {courseData.level} Level</p>

                <span>${courseData.pricing}</span>
            </div>
        </div>
    )
}