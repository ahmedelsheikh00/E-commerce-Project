import React, { useContext,useState } from 'react';
import axios, { Axios } from 'axios';
import { useFormik } from 'formik';

import { useNavigate,Link } from 'react-router-dom';
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie';

 
export default function Login() {
const {userIsloggedIn , setUserIsloggedIn}=useContext(authContext)
  const[errorMsg , setErrorMsg]=useState('')
  const[isLoading ,setIsloading]=useState(false)
const navigate =useNavigate()


  const validate2 = Yup.object({
     email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Enter don't valid Email"),
    password:Yup.string().required("Password is required").min(8,"name is min length must be  8 chareter"),
   });
  
 
 

const {values , handleChange , handleBlur , handleSubmit , errors ,touched ,isValid} =   useFormik({
 initialValues:{
 
  email:"",
  password:"",

 },
 onSubmit:async()=>{
  setErrorMsg('')
try {
  setIsloading(true)
  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
  if(data.message="success"){
    setUserIsloggedIn(true)
   Cookies.set('token', data.token)

    if(window.location.pathname=='/login'){
      navigate("/home")
    }else{
      navigate(window.location.pathname)
    }
    
  }
  
} catch (error) {
  setErrorMsg(error.response.data.message)
  
}
setIsloading(false)
 },
validationSchema:validate2
})
  return <>
   
  <Helmet>
    <title>Fresh cart|Login </title>
  </Helmet>

    <div className="w-75 m-auto my-5">
      <h1>Login Now :</h1>
      <form onSubmit={handleSubmit}>

         <label htmlFor="email" className='my-1'>Email:</label>
        <input type="email" className='form-control mb-3' id='email' name='email' value={values.email} onChange={handleChange}  onBlur={handleBlur}  />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}
        
        <label htmlFor="password" className='my-1'>Password:</label>
        <input type="password" className='form-control mb-3' id='password' name='password' value={values.password} onChange={handleChange}  onBlur={handleBlur} />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}
        
     
       
        { errorMsg && <div className="alert alert-danger">{errorMsg}</div> } 
       {isLoading ? 
       <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>  
       :
        <button disabled={!isValid || isLoading}  type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Login</button>

       
      }


<Link to={'/forgetpassword'} >
        <p className='btn btn-danger  m-0 '>ForgetPassword?</p>
         </Link>
        </form>
    </div>
  </>
}



