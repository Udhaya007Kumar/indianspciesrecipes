import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import UserContextProvider from './Context/UserContextProvider';
import Homepage from './Pages/Homepage';
import Singup from './Pages/Singup';
import Login from './Pages/Login';
import RecipesDetails from './Pages/RecipesDetails';
import Createpage from './Pages/Createpage';
import Profile from './Pages/Profile';
import Profileedit from './Pages/Profileedit';
import About from './Pages/About';
import { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from "./Components/LoadingSpinner";
import Navbar from './Components/Navbar';
import SearchPage from './Pages/SearchPage';
import UserRecipesList from './Pages/UserRecipesList';
import NotfoundPage from './Pages/NotfoundPage';






const App = () => {

  // const isAuthenticated = true; // Replace with your actual logic for checking authentication status.

  // const { data: authUser, isLoading, error } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:4000/api/auth/user", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     if (!res.ok || data.error) {
  //       throw new Error(data.error || "Failed to fetch user data");
  //     }
  //     return data;
  //   },
  //   retry: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   enabled: isAuthenticated, // Only run query if user is authenticated
  // });
  
  // useEffect(() => {
  //   if (!isLoading && authUser) {
  //     console.log("Authenticated user:", authUser);
  //   } else if (error) {
  //     console.error("Error fetching auth user:", error.message);
  //   }
  // }, [authUser, isLoading, error]);


  //  if(isLoading){
  //    return <div className='flex justify-center items-center h-screen'>
  //   <LoadingSpinner size='lg' />
  //     </div>;
  //  }


 
    


  // const { user } = useContext(UserContext);

  // console.log(user);
  
  
  //  const { user } = useContext(UserContext);

   



   
  









  return (
   
      <BrowserRouter>
      <UserContextProvider>
          <Navbar/>  

        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/recipe/:id' element={<RecipesDetails/>} />
           <Route path='/create' element={ <Createpage/>} /> 
          <Route path='/signup' element={<Singup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/profile' element={  <Profile/> } />
          <Route path='/profile/:id' element={ <Profileedit/>} />
          <Route path='/search' element={ <SearchPage/> } />
          <Route path='/userrecipes/:id' element={<UserRecipesList/>} />

          <Route path='*' element={<NotfoundPage/>} />
        </Routes>
        <Toaster />
      </UserContextProvider>
      </BrowserRouter>
    
   
  );
};

export default App;