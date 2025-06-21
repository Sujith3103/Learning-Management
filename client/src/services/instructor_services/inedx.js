import server from "@/api/axiosInstance"
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config"


export const addNewCourse = async (course_data) => {

    console.log("course data in post : ", course_data)
    const response = await server.post('/course/add', course_data)

    console.log(response)
}

export const handleFetchCourseDetails = async ({ id, setCourseCurriculumFormData, setCourseLandingFormData }) => {
    if (!id) {
        return false
    }
    const response = await server.get(`/course/get/details/${id}`)
    if (response.data.success) {
        const curriculumData = response.data.data.lectures;

        const cpycourseLandingInitialFormData = { ...courseLandingInitialFormData };

        for (const item in courseLandingInitialFormData) {
            cpycourseLandingInitialFormData[item] = response.data.data[item];
        }   

        const landingData = { ...response.data.data }
        delete landingData.lectures
        setCourseLandingFormData(cpycourseLandingInitialFormData)
        setCourseCurriculumFormData(curriculumData)
    }
}

export const updateCourseDetails = async ({ id, submit_Data }) => {

    console.log("Submitted data : ", submit_Data)
    const response = await server.put(`/course/update/${id}`, submit_Data)

    console.log(response)
}   