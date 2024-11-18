import React, { useState,useEffect } from 'react';
import UserContext from './UserContext';
import axios from "axios";




const UserContextProvider = ({children })=>{

    const [data,setdata] = useState() //All Recipes Data Files
    const [selectedId, setSelectedId] = useState(null); //single Recipe Id
    const [singleRecipe,setSingleRecipe] = useState() //single Recipe

    
    

  
   
    
    

    const allRecipesGet = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/recipe/all");
            setdata(res.data);
           // Log the data after setting it
            
        } catch (error) {
            console.log(error);
        } 
    };
    
    useEffect(() => {
        allRecipesGet();
    }, []);

    const singleRecipeGet = async (id) => {
        try {
          const res = await axios.get(`http://localhost:4000/api/recipe/singlerecipe/${id}`);
          setSingleRecipe(res.data);
          
        } catch (error) {
          console.log(error);
        }
      };

    
      useEffect(() => {
        singleRecipeGet(selectedId);
      }, [selectedId]); // Dependency on 'id' directly from useParams
    

      




    return(
        <UserContext.Provider value={{data,setdata,setSelectedId,selectedId,singleRecipe}}>
            {children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;