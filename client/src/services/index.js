import server from "@/api/axiosInstance";
import { useSearchParams } from "react-router-dom";

export const registerService = async (formData) => {

    const { data } = await server.post('/auth/register', {
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

    const response = await server.get(`/student/course/get?${query.toString()}`);
    return response.data.data;
};

export const getCourseById = async (id) => {

    if (id) {
        const response = await server.get(`/course/get/details/${id}`)
        console.log("response : ", response.data.data)
        return response
    }

}

export const createPaymentService = async (formData) => {
    const { data } = await server.post('/student/order/create', formData)
    console.log("create: ", data)
    return data
}
export const captureAndFinalizePaymentService = async (paymentId,payerId,orderId) => {
    const { data } = await server.post('/student/order/capture', {
        paymentId,
        payerId,
        orderId
    });
    console.log("capture: ", data)
    return data;
}

export const userBoughtCourses = async() => {
    const response = await server.get('/student/mycourse/get-mycourses')
    console.log(response.data.user_Courses)

    return response.data.user_Courses
}
