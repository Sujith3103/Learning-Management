import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService } from "@/services";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {

    const navigate = useNavigate()

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

    const handleRegisterUser = async(e) => {
        e.preventDefault()
        const data = await registerService(signUpFormData)

        console.log(data)
        data.success? navigate('/auth', { state: { show: 'signin' } })  : alert(data.message)
    }   

    return <AuthContext.Provider value={{signInFormData,signUpFormData,setSignInFormData,setSignUpFormData,handleRegisterUser}}>{children}</AuthContext.Provider>

}       