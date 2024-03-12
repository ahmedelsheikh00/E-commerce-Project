import Cookies from "js-cookie";
import {  createContext, useState } from "react";


export const authContext =createContext()
export default  function AuthContextProvider( {children}){
const [userIsloggedIn , setUserIsloggedIn]=useState(!!Cookies.get("token"))

/* useEffect(()=>{
    if(Cookies.get("token")!=null){
        setUserIsloggedIn(true)
    }
},[]) */


    return <authContext.Provider value={{userIsloggedIn ,setUserIsloggedIn}}>
        {children}
    </authContext.Provider>
}  