import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import About from './Components/About';
import Register from './Components/Register';
import Rootlayout from './Rootlayout';
import UserProfile from './Components/UserProfile';
import AdminProfile from './Components/AdminProfile';
import Chatbot from './Components/Chatbot';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import ChatComponent from './Components/ChatComponent';

function App() {
  let BrowserRouter=createBrowserRouter([
    {
      path:'',
      element:<Rootlayout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/user-profile',
          element:<UserProfile/>
        },
        {
            path:'/chatbot',
            element:<Chatbot/>
        },
        {
          path:'/admin-profile',
          element:<AdminProfile/>
        }
      ]
    }
  ])
  return (
   <div>
    <RouterProvider router={BrowserRouter}></RouterProvider>
   </div>
  );
}

export default App;
