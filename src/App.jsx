import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import UserContextProvider from './Context/UserContextProvider';
import Homepage from './Pages/Homepage';
import Singup from './Pages/Singup';
import Login from './Pages/Login';
import Notfound from './Pages/Notfound';
import RecipesDetails from './Pages/RecipesDetails';
import Createpage from './Pages/Createpage';
import Profile from './Pages/Profile';
import Profileedit from './Pages/Profileedit';
import About from './Pages/About';
import { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from "./Components/LoadingSpinner";


const App = () => {

   const {data:authUser,isLoading}=useQuery({
     queryKey:["authUser"],
     queryFn: async () => {
       try {
        const res = await fetch("http://localhost:4000/api/auth/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            
          }
          
        })
        const data = await res.json();
       if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to fetch user data");
      }
        //console.log("authUser",data);
        return data;

       } catch (error) {
        throw error;
       }
     },
     retry:false
     
   })
  
   

   if(isLoading){
     return <div className='flex justify-center items-center h-screen'>
    <LoadingSpinner size='lg' />
      </div>;
   }






  return (
   
      <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/recipe/:id' element={<RecipesDetails/>} />
          <Route path='/create' element={authUser ? <Createpage/>: <Login/>} />
          <Route path='/signup' element={<Singup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/profile' element={authUser ? <Profile/> : <Login/>} />
          <Route path='/profileEdit' element={authUser ? <Profileedit/>: <Login/>} />
          
          <Route path='*' element={<Notfound/>} />
        </Routes>
        <Toaster />
      </UserContextProvider>
      </BrowserRouter>
    
   
  );
};

export default App;