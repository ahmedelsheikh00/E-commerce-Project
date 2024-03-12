import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const Orders = () => {




const [allOrders, setallOrders] = useState([])
const [isloading, setisloading] = useState(true)



async function getAllOrders(id) {

try {
  const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/`+id)
  setallOrders(data)

} catch (error) {
  console.log(error)
}

setisloading(false)
}


useEffect(()=>{
  const {id}=jwtDecode(Cookies.get('token'))
getAllOrders(id)
},[])

  return (
    <>
    <Helmet>
  <meta charSet="utf-8" />
  <title>Orders Page</title>
  <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
    {isloading?
    <div className=' d-flex justify-content-center align-items-center py-5 my-3'>
    <i className=' fas fa-spinner fa-spin fa-2x'></i>
    
    </div>
    :
    <>
    {allOrders.length>0 ?
    <>
    <div className='mt-3'></div>
    {allOrders.map((order,index)=><div key={index} className=' g-2'>
      
      <div className='order shadow rounded p-3 p-md-4 my-md-4 my-3'>
        <div className='d-flex align-items-center'>
          <h2 className='fw-bolder h1'>#{order.id}</h2>
          <h4 className='fw-bold text-success mx-4'>Processing</h4>
        </div>
        <p>you have ordered {order.cartItems.length} items.</p>
        <div className='d-flex gap-2 flex-wrap'>
          {order.cartItems.map((item,index)=><img src={item.product.imageCover} key={index} style={{width:150}} className='img-thumbnail mx-1' alt='steve_jobs'/>)}
        </div>
        <hr />
        <p><span className='fw-bolder'>Total amount:</span>{order.totalOrderPrice} EGP</p>
      </div>
     
    </div>
    
    )}
    </>
    
    :
    <h5 className='bg-success-subtle text-center py-3 mt-5'>No product has been purchased yet..</h5>
    
    
    }
    
    
    
   



    </>}
    
      
    </>
  )
}

export default Orders