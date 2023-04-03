import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState({})
 
    const [isLogin, setIsLogin] = useState()
    useEffect(()=>{
        if(!getUserToken()){
            setIsLogin(true)
        }

    },[user])
    
    function getUserToken(){
        
        return localStorage.getItem("access_token")
    }

    function getUserFirstName()
    {
        return localStorage.getItem("firstName")
    }
    
    function getUserLastName()
    {
        return localStorage.getItem("lastName")
    }
    function removeLocalDatas(){
        localStorage.removeItem("access_token")
        localStorage.removeItem("firstName")
        localStorage.removeItem("lastName")
    }
    const values = {
        user,
        setUser,
        getUserToken,
        getUserFirstName,
        getUserLastName,
        removeLocalDatas,
        isLogin,
        setIsLogin
    }


    return (<UserContext.Provider value = {values}>
        {children}
    </UserContext.Provider>)
}

export const useUser=()=> useContext(UserContext);