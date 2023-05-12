import { Navigate,Outlet } from "react-router-dom";
import React,{ useState, useEffect,useRef,useReducer } from 'react'
const useAuth = (answer) => {
    const user = answer;
    console.log(user)
    return user
    //return user && user.loggedIn

}


const ProtectedRoutes = ({log_in}) => {
    const isAuth = useAuth({log_in})
    console.log(isAuth)
    return isAuth.log_in ? <Outlet /> : <Navigate to="/login" replace={true} />
}

export default ProtectedRoutes