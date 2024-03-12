import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {

    const {userIsloggedIn , setUserIsloggedIn}=useContext(authContext)
  return (
   <>
   {userIsloggedIn?   children :<Login/> }
   </>
  )
}
