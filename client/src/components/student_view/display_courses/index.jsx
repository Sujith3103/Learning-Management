
export const DisplayCourseData = ({courseData}) => {

    const Lecture_len = courseData.lectures.length
    
    return(
        <div className="flex">
            <img src={courseData.image} alt="" className="w-50" />
            <div>
                <h1>{courseData.title}</h1>
                <p>Created By {courseData.instructor.userName}</p>

                <p><span>${Lecture_len}</span> - {courseData.level} Level</p>

                <span>${courseData.pricing}</span>
            </div>
        </div>
    )
}