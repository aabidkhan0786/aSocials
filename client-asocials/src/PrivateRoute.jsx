import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

    const loggedIn = JSON.parse(localStorage.getItem("Profile"))
    console.log(loggedIn);

    if(loggedIn){
        return <Outlet/>
    }else{
        return <Navigate to="/login" />
    }
}

export default PrivateRoute
