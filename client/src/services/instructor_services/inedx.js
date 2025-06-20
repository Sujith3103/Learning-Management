import server from "@/api/axiosInstance"


export const addNewCourse = async (course_data) => {

    console.log("course data in post : ", course_data)
    const response = await server.post('/course/add', course_data)

    console.log(response)
}

export const handleFetchCourseDetails = async ({ id, setCourseCurriculumFormData, setCourseLandingFormData }) => {
    console.log("ID : ",id)
    const response = await server.get(`/course/get/details/${id}`)
    console.log(response.data)
    if (response.data.success) {
        const curriculumData = response.data.data.lectures;

        // for(const key in courseCurriculumFormData){
        //   courseCurriculumFormData[key] = curriculumData[key]
        // } 
        const landingData = { ...response.data.data }
        delete landingData.lectures
        setCourseLandingFormData(landingData)

        setCourseCurriculumFormData(curriculumData)
    }
}