import server from "@/api/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        accessToken: null
    })

    // delay when navigate to other pages, when there is delay then render skeleton
    const [loading, setLoading] = useState(true)

    const handleUserAuth = async () => {

        try{
        const { data } = await server.get('/auth/check-auth')

        if (data.success) {
            setAuth({
                isAuthenticated: true,
                user: data.data.user,
                accessToken: data.data.accessToken
            })
            setLoading(false)
            console.log("User Authenticated")
            // sessionStorage.setItem('accessToken', data.data.accessToken) this mf when navigating to other pages, the access token becomes undifined
        }
        console.log("Auth Data: ", data)

        setLoading(false)
        }
        catch(err){
            console.log("Error in checking user auth: ", err)
            if(!err.response?.data?.success){
                setAuth({
                    isAuthenticated: false,
                    user: null,
                    accessToken: null
                })
                setLoading(false)
                console.log("User Not Authenticated")
            }
        }

    }

    useEffect(() => {
        handleUserAuth()
    }, [])


    // const handleRegisterUser = async(e) => {
    //     e.preventDefault()
    //     const data = await registerService(signUpFormData)

    //     console.log(data)
    //     data.success? navigate('/auth', { state: { show: 'signin' } })  : alert(data.message)
    // }   

    return <AuthContext.Provider value={{ signInFormData, signUpFormData, setSignInFormData, setSignUpFormData, auth, setAuth }}>{loading? <Skeleton /> : children}</AuthContext.Provider>

}       