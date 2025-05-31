import server from "@/api/axiosInstance";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {

    const navigate = useNavigate()

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [auth,setAuth] = useState({
        isAuthenticated: false,
        user: null,
        accessToken: null
    })

    const handleUserAuth = async () => {
        const {data} = await server.get('/auth/check-auth')

        console.log("Auth Data: ", data)
        

    }

    useEffect(() => {
        handleUserAuth()
    },[])


    // const handleRegisterUser = async(e) => {
    //     e.preventDefault()
    //     const data = await registerService(signUpFormData)

    //     console.log(data)
    //     data.success? navigate('/auth', { state: { show: 'signin' } })  : alert(data.message)
    // }   

    return <AuthContext.Provider value={{signInFormData,signUpFormData,setSignInFormData,setSignUpFormData,auth,setAuth}}>{children}</AuthContext.Provider>

}       