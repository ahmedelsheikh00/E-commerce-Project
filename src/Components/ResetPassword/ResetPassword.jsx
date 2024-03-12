import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  
const navigate=useNavigate()

const validationSchema= Yup.object({
  email:Yup.string().required('Email is required').matches(/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-Z]{2,4}$/i,'Enter valid Email'),
  newPassword:Yup.string().required('Password is required').matches(/^([A-Z]|[a-z]|[0-9]|[!@#$%^&*]){8,}$/,'password most contain special character , number more than 8 characters and less than 18 characters'  ),
 })

  const { values , handleSubmit , handleChange ,errors,touched }=useFormik({
    
    initialValues:{
      email:"",
      newPassword:'',

    },
    onSubmit:async()=>{
      
     try {
        const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          email:values.email,
          newPassword:values.newPassword 
      }
        )
        if (data.token) {
          navigate('/')
        }
        
        console.log(data)
        
     } catch (error) {

        console.log(error.response.data.message)

     }
        

  
  
    },
    validationSchema
  })


  return (
    <>

    <form className='py-5' onSubmit={handleSubmit}>

        <label htmlFor="email" className='form-label h5 lh-lg  fw-bolder'>Email :</label>
        <input placeholder='email' value={values.email} onChange={handleChange} type="email" className=' form-control my-3 p-md-3' id='email' name="email" />
        {errors.email && touched.email && <p className=' alert alert-danger'>{errors.email}</p>}


        <label htmlFor="newPassword" className='form-label h5 lh-lg  fw-bolder'>Password :</label>
        <input placeholder='newPassword' value={values.newPassword} onChange={handleChange} type="password" className=' form-control my-3 p-md-3' id='newPassword' name='newPassword' />
        {errors.newPassword && touched.newPassword && <p className=' alert alert-danger'>{errors.newPassword}</p>}


      <button className='btn btn-success mt-2'>Verify</button>
    
    </form>
    
    
    </>
  )
}

export default ResetPassword