import React, { useState,useEffect } from 'react'
import Slider from "react-slick";
import axios from 'axios';
export default function Categorsslider() {
 const [categories ,setcategories]=useState([])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows:false,
    
      };    
   async function getAllCategors(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  setcategories(data.data);
    }

    useEffect(()=>{
        getAllCategors()
      
      },[]) 

  return (
  <>
  
  <div className="categors-slider">
  <Slider {...settings}>
  {categories.map((category , index)=>{
       return <div key={index}  className='mt-5'>
         <img style={{height:200}} src={category.image}  className='w-100' alt="" />
         <h5 className='text-center'>{category.name}</h5>
       </div>
       })}
      
    </Slider>
</div>

  
  </>
  )
}
