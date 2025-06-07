import { AuthContext } from "@/context/auth_context";
import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"

const RouteGuard = ({element}) => {

    const location = useLocation()

    const {auth} = useContext(AuthContext);

    const user = auth.user || {};
    const authenticated = user && auth.isAuthenticated;

    console.log("authenticated: ", authenticated)

    if (!authenticated && !location.pathname.includes("/auth")) {
        //return <Navigate to="/auth/login" state={{ from: location }} replace />;
        return <Navigate to="/auth" />
    }

    if (authenticated && user.role !== "admin" && (location.pathname.includes("instructor") || location.pathname.includes("/auth"))) {
        return <Navigate to="/home" />
    }   

    if (authenticated && user.role === "admin" && !location.pathname.includes('instructor')) {
        return <Navigate to="/instructor" />
    }   
  
    return element
    

}

export default RouteGuard;
