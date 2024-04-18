import React from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import HomeLayout from './pages/home/HomeLayout'
import Transaction from './pages/transaction/Transaction'
import { QueryClient,QueryClientProvider } from "react-query"
import {ReactQueryDevtools} from 'react-query/devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MasterLayout from './Layout/MasterLayout'



export default function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<MasterLayout/>,
      children:[
        {
          path:'',
          element:<HomeLayout/>
        },
        {
          path:'transaction',
          element:<Transaction/>
        }
      ]
    },{
      path:'/register',
      element:<Register/>
    },
    {
      path:'/login',
      element:<Login/>
    }
])

  const queryClient =new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
     <RouterProvider router={router}/>
     <ReactQueryDevtools intialIsOpen={false} position="bottom-right"/>

    </QueryClientProvider>
    
  )
}
