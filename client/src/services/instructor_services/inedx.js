import server from "@/api/axiosInstance"

export const addNewCourse = async(course_data) => {

    console.log("course data in post : ",course_data)
    const response = await server.post('/course/add', course_data)
    
    console.log(response)
}