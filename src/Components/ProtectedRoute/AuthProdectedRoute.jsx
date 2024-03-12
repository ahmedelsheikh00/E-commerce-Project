
import React, { useContext } from 'react';
import { authContext } from '../../Context/AuthContext';
import Home from '../Home/Home';
import { Navigate } from 'react-router-dom';
export default function AuthProdectedRoute({children}) {
    const {userIsloggedIn , setUserIsloggedIn}=useContext(authContext)
  return (
    <>
    {userIsloggedIn? <Navigate to={"/home"} /> :children}
    </>
  )
}
