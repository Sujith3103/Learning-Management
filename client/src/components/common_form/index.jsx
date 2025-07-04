import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import FormControls from "./form_controls";
import server from "@/api/axiosInstance";
import { useContext, useEffect } from "react";
import { set } from "mongoose";
import { AuthContext } from "@/context/auth_context";
import { getAllUserBoughtCourses } from "@/services";
import { StudentContext } from "@/context/student_context";
import { saveBoughtCourses } from "@/indexedDB/indexedDB";

export default function CommonForm({ handleSubmit, buttonText, formControls = [], formData, setFormData, isButtonDisabled, context }) {

  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);
  const { studentBoughtCoursesData, setstudentBoughtCoursesData } = useContext(StudentContext)

  const handleAuth = async (formData, e) => {
    e.preventDefault();

    if (context === "signup") {
      const { data } = await server.post('/auth/register', formData)
      if (data.success) {
        window.location.reload();
        // const response = await getAllUserBoughtCourses()
      }
      console.log("Data : ", data)

    }

    else if (context === "signin") {
      try {
        console.log("Form Data : ", formData)
        const { data } = await server.post('/auth/login', formData);

        console.log("Data : ", data.data.user)

        if (data.success) {
         sessionStorage.setItem('accessToken', data.data.accessToken)
          setAuth({
            isAuthenticated: true,
            user: data.data.user,
            accessToken: data.data.accessToken
          });

          const response = await getAllUserBoughtCourses()
          setstudentBoughtCoursesData(response)
          saveBoughtCourses(response)
        }
      } catch (error) {
        console.error("Caught error:", error); // 👈 handles the rejection
      }
    }
  }

  useEffect(() => {
    console.log("stu bou cour: ", studentBoughtCoursesData)
  }, [studentBoughtCoursesData])
  return (
    <form onSubmit={(e) => handleAuth(formData, e)}>

      {/* {render Form Controls Here} */}
      <FormControls formControls={formControls} formData={formData} setFormData={setFormData} />
      <Button type="submit" className="w-full mt-5">{buttonText || "Submit"}</Button>
    </form>

  );
}