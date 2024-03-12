
import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
// import ReactQueryDevTools from 'react-query/devtools'
// import { Offline, Online } from "react-detect-offline";
// import { ToastContainer} from 'react-toastify';

import { Navigate, RouterProvider,  createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Product from './Components/Product/Product'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import Orders from './Components/Orders/Orders'
import Login from './Components/Login/Login'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import NotFound from './Components/NotFound/NotFound'
import AuthProdectedRoute from "./Components/ProtectedRoute/AuthProdectedRoute"
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import AuthContextProvider from './Context/AuthContext'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import CodeToEmail from './Components/CodeToEmail/CodeToEmail'
import Address from './Components/Address/Address'
import Wishlist from './Components/Wishlist/Wishlist'
import CartContextprovide from './Context/CartContext'

export default function App() {

const router =createHashRouter([{

path:"", element:<Layout/>,children:[

{path:"", element:<Navigate to={"home"}/>},
{path:"login", element: <AuthProdectedRoute><Login/></AuthProdectedRoute>},
{path:"register", element: <AuthProdectedRoute><Register/></AuthProdectedRoute>},
{path:"forgetpassword", element: <AuthProdectedRoute><ForgetPassword/></AuthProdectedRoute>},
{path:"resetpassword", element: <AuthProdectedRoute><ResetPassword/></AuthProdectedRoute>},
{path:"codetoemail", element: <AuthProdectedRoute><CodeToEmail/> </AuthProdectedRoute>},


{path:"home", element:   <ProtectedRoute> <Home/> </ProtectedRoute> },
{path:"product", element:    <ProtectedRoute> <Product/> </ProtectedRoute>  },
{path:"products", element:   <ProtectedRoute> <Products/> </ProtectedRoute>  },
{path:"allorders", element:   <ProtectedRoute> <Orders/> </ProtectedRoute>  },
{path:"brands", element:    <ProtectedRoute> <Brands/> </ProtectedRoute>  },
{path:"wishlist", element:    <ProtectedRoute> <Wishlist/> </ProtectedRoute>  },
{path:"cart", element:  <ProtectedRoute> <Cart/> </ProtectedRoute>  },
{path:"address/:cartId", element:  <ProtectedRoute> <Address/> </ProtectedRoute>  },
{path:"categories", element:   <ProtectedRoute> <Categories/> </ProtectedRoute> },
{path:"productdetails/:id", element:  <ProtectedRoute> <ProductDetails/>  </ProtectedRoute> },



{path:"*", element:<NotFound/> }, 
]
}])
const queryClient = new QueryClient()
  return (
 <>

{/* <Online>Only shown when you're online</Online>
    <Offline>Only shown offline (surprise!)</Offline> */}

 <QueryClientProvider client={queryClient} >



<AuthContextProvider>
<CartContextprovide>
<RouterProvider router={router}> </RouterProvider>
</CartContextprovide>
</AuthContextProvider>

{/* <ReactQueryDevTools/> */}

</QueryClientProvider>
 
 </>
  )
}
