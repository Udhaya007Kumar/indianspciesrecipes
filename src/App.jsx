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
import Navbar from './Components/Navbar';
import SearchPage from './Pages/SearchPage';
import UserRecipesList from './Pages/UserRecipesList';
import NotfoundPage from './Pages/NotfoundPage';






const App = () => {



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