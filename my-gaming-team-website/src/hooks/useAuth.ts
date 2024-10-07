import { AuthContext, AuthContextType } from "../context/AuthContext"
import { useContext } from "react"



const useAuth = (): AuthContextType => {
    return useContext(AuthContext);
};


export default useAuth;