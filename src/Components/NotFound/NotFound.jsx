import React from 'react'
import notFoundImg from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet'

function NotFound() {
    return ( 
   
        <div className='text-center my-5'>
        
  <Helmet>
    <title>Fresh cart|Notfound </title>
  </Helmet>

            <img className='w-50 py-5' src={notFoundImg} alt="" />
        </div>
    )
}

export default NotFound