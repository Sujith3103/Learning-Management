import server from "@/api/axiosInstance";

export const registerService = async (formData) => {

    const  {data}  = await server.post('/auth/register', {
        ...formData,
        role: 'student' // Default role set to student
    });


    return data;
}