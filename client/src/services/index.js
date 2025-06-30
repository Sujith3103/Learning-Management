import server from "@/api/axiosInstance";
import { useSearchParams } from "react-router-dom";

export const registerService = async (formData) => {

    const  {data}  = await server.post('/auth/register', {
        ...formData,
        role: 'student' // Default role set to student
    });


    return data;
}

export const getAllCourses = async (searchParams) => {
    const categoryParams = searchParams.get("category")?.split(",") || [];
    const levelParams = searchParams.get("level")?.split(",") || [];
    const languageParams = searchParams.get("language")?.split(",") || [];

    // build a valid query string
    const query = new URLSearchParams();
    if (categoryParams.length > 0) query.set("category", categoryParams.join(","));
    if (levelParams.length > 0) query.set("level", levelParams.join(","));
    if (languageParams.length > 0) query.set("language", languageParams.join(","));

    console.log("final query string:", query.toString());

    const response = await server.get(`/student/course/get?${query.toString()}`);
    return response.data.data;
};
