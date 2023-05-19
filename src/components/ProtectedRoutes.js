import { Navigate,Outlet } from "react-router-dom";
import React,{ useState, useEffect,useRef,useReducer } from 'react'
import { Route, Redirect } from 'react-router-dom';

//useAuth 很重要?，不使用useAuth，可以直接在brower按f12，使用components頁面去改log_in的state?
const useAuth = (answer) => {
    const user = answer;
    console.log(user)
    return user
}
/*

const ProtectedRoutes = ({log_in}) => {
    const isAuth = useAuth({log_in})
    console.log(isAuth)
    return isAuth.log_in ? <Outlet /> : <Navigate to="/login" replace={true} />
}
*/

/*
const ProtectedRoutes = ({log_in}) => {
    console.log({log_in})
    console.log({log_in})
    return log_in ? <Outlet /> : <Navigate to="/login" replace={true} />
}
*/


const ProtectedRoutes = ({log_in}) => {

    return log_in ? <Outlet /> : <Navigate to="/login" replace={true} />
        
   
    
}

export default ProtectedRoutes