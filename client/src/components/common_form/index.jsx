import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import FormControls from "./form_controls";
import server from "@/api/axiosInstance";

export default function CommonForm({ handleSubmit, buttonText, formControls = [], formData, setFormData, isButtonDisabled, context }) {

  const navigate = useNavigate();

  const handleAuth = async (formData, e) => {
    e.preventDefault();

    if (context === "signup") {
      const { data } = await server.post('/auth/register', formData)
      console.log("Data : ", data)

    }
    else if (context === "signin") {
      try {
        const { data } = await server.post('/auth/login', formData);
        sessionStorage.setItem('token', data.data.accessToken)

        console.log("Data : ", data)

        if (data.success) {
          navigate('/')
        }
      } catch (error) {
        console.error("Caught error:", error); // 👈 handles the rejection
      }



    }
  }

  return (
    <form onSubmit={(e) => handleAuth(formData, e)}>

      {/* {render Form Controls Here} */}
      <FormControls formControls={formControls} formData={formData} setFormData={setFormData} />
      <Button type="submit" className="w-full mt-5">{buttonText || "Submit"}</Button>
    </form>

  );
}