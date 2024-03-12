import axios, { Axios } from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'


export default function Register() {
  const[errorMsg , setErrorMsg]=useState("")
  const[isLoading ,setIsloading]=useState(false)
const navigate =useNavigate()


  const validate2 = Yup.object({
    name:Yup.string().required("name is required").min(3,"name is min length must be  3 chareter").max(20,"name is max length must be  20 chareter"),
    email:Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Enter don't valid Email"),
    password:Yup.string().required("Password is required").min(8,"name is min length must be  8 chareter"),
    rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")]),
    phone:Yup.string().required("phone is required"),
  }); 
  
  // matches(/^01[0125][0-9]{8}$ /,"Enter valid Egyption phone number")
  // .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6-16}$/,"password don't valid Email")

  function validate(values){
    const errors={}
    if(values.name==""){
      errors.name="name is required"
    }else if(values.name.length<3){
      errors.name="name is min length must be  3 chareter"
    }else if(values.name.length>20){
      errors.name="name is max length must be  20 chareter"
    }
     
    if(values.email==""){
      errors.email="Email is required"
    }else if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(values.email)){
      errors.email="Enter valid Email"
    }
   
    if(values.password==""){
      errors.password="password is required"
    }else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6-16}$/).test(values.password)){
      errors.password="Enter valid password"
    }
    if(values.rePassword==""){
      errors.rePassword="Repassword is required"
    }else if(values.password != values.rePassword){
      errors.rePassword="password and repassword dosen't match"
    }
    if(values.phone==""){
      errors.phone="phone is required"
    }else if(!(/^01[0125][0-9]{8}$ /).test(values.phone)){
      errors.phone="Enter valid Egyption phone number "
    }
   return errors;

  }

const {values , handleChange , handleBlur , handleSubmit , errors ,touched ,isValid} =   useFormik({
 initialValues:{
  name:"",
  email:"",
  password:"",
  rePassword:"",
  phone:"",
 },
 onSubmit:async()=>{
  setErrorMsg('')
try {
  setIsloading(true)
  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
  if(data.message="success"){
    navigate("/login")
  }
  // setErrorMsg(data.message)
  // console.log(data.message);
} catch (error) {
  setErrorMsg(error.response.data.message)
  console.log(error.response.data.message);
}
setIsloading(false)
 },
validationSchema:validate2
})
  return <>
  
  <Helmet>
    <title>Fresh cart|Register </title>
  </Helmet>

    <div className="w-75 m-auto my-5">
      <h1>Register Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='my-1'>Name:</label>
        <input type="text" className='form-control mb-3' id='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur}  />
       {errors.name && touched.name && <p className='alert alert-danger'>{errors.name}</p>}
        <label htmlFor="email" className='my-1'>Email:</label>
        <input type="email" className='form-control mb-3' id='email' name='email' value={values.email} onChange={handleChange}  onBlur={handleBlur}  />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}
        <label htmlFor="password" className='my-1'>Password:</label>
        <input type="password" className='form-control mb-3' id='password' name='password' value={values.password} onChange={handleChange}  onBlur={handleBlur} />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}
        <label htmlFor="rePassword" className='my-1'>RePassword:</label>
        <input type="password" className='form-control mb-3' id='rePassword' name='rePassword' value={values.rePassword} onChange={handleChange}  onBlur={handleBlur} />
        {errors.rePassword && touched.rePassword && <p className='alert alert-danger'>{errors.rePassword}</p>}
        <label htmlFor="phone" className='my-1'>phone:</label>
        <input type="tel" className='form-control mb-3' id='phone' name='phone' value={values.phone} onChange={handleChange}  onBlur={handleBlur}  />
        {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}
        { errorMsg && <div className="alert alert-danger">{errorMsg}</div> } 
       {isLoading ? 
       <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button>  
       :    
        <button disabled={!isValid || isLoading}  type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>
      }
        </form>
    </div>
  </>
}
