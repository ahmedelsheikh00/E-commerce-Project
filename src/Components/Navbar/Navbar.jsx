import React, { useContext } from 'react';
import logo from '../../Assets/images/freshcart-logo.svg'
import { Link,  useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import Cookies from 'js-cookie'; 
export default function Navbar() {
  const pathactive=window.location.hash
  const navigate =useNavigate()
function logOut(){
  setUserIsloggedIn(false)
Cookies.remove("token")
navigate("/login")

}
const{cart }=useContext(CartContext)
console.log(cart)
  const {userIsloggedIn , setUserIsloggedIn}=useContext(authContext)
  return <>
 <div className="h-nav"></div>
    <nav className="navbar navbar-expand-lg bg-body-tertiar fixed-top bg-light ">
      <div className="container">
        <Link to={"home"} className="navbar-brand">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
   { userIsloggedIn  &&      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className=   {  `  nav-link text-center ${pathactive === '#/home'?'active':''} `} to={'home'}>Home</Link>
              
            </li>
            <li className="nav-item">
            <Link className={`nav-link text-center ${pathactive === '#/cart'?'active':''} `} to={'cart'}>Cart</Link>
              
            </li>
            <li className="nav-item">
            <Link className={`nav-link text-center ${pathactive === '#/products'?'active':''} `} to={'products'}>Products</Link>
             
            </li>
            <li className="nav-item">
            <Link className={`nav-link text-center ${pathactive === '#/categories'?'active':''} `} to={'categories'}>Categories</Link>
              
            </li>
            <li className="nav-item">
            <Link className={`nav-link text-center ${pathactive === '#/brands'?'active':''} `} to={'brands'}>Brands</Link>

            </li>
            <li className="nav-item">
            <Link className={`nav-link text-center ${pathactive === '#/allorders'?'active':''} `} to={'allorders'}>Orders</Link>
            </li>
            <li className="nav-item">
              
              <Link className={`nav-link text-center ${pathactive === '#/wishlist'?'active':''} `} to={'wishlist'}>Wishlist</Link>
            </li>
          </ul>}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
           <Link to={"cart"} >
           <i className='fa-solid fa-cart-shopping fa-2x position-relative'>
             <span className='position-absolute top-0 start-100 translate-middle bg-success p-2 rounded-circle font-sm'>{cart.numOfCartItems||0}</span>
            </i>
           
           </Link>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
       { userIsloggedIn? 
       
       <li className="nav-item">
       <span onClick={logOut} className="nav-link cursor-pointer ">Logout</span>
     </li> : <>
              <li className="nav-item">
              <Link className={`nav-link text-center ${pathactive === '#/login'?'active':''} `} to={'login'}>Login</Link>
                
              </li>
              <li className="nav-item">
              <Link className={`nav-link text-center ${pathactive === '#/register'?'active':''} `} to={'register'}>Register</Link>
                
              </li>
            </>
          }
          </ul>
        </div>
      </div>
    </nav>
  </>
}
