import server from "@/api/axiosInstance";

export const registerService = async (formData) => {

    const  {data}  = await server.post('/auth/register', {
        ...formData,
        role: 'student' // Default role set to student
    });


    return data;
}

export const getAllCourses = async() => {
    const response = await server.get("/student/course/get")
    console.log(response.data.data)
    return response.data.data
    
}