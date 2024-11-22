import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../Context/UserContext";


const UserRecipesList = () => {

    const { user,userList,setUserList } = useContext(UserContext);

    console.log(userList?.user[0].title);
    
    //onsole.log(userList?.user?.title);

    const handleDeleteRecipe = async (recipeId) => {
        try {
          const res = await fetch(`https://indianspciesrecipesbg.onrender.com/api/recipe/delete/${recipeId}`, {
            method: "DELETE", // DELETE method for deleting resources
            credentials: "include", // Ensure cookies are sent for session-based authentication
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          const data = await res.json();
      
          if (!res.ok) {
            throw new Error(data.message || "Failed to delete the recipe.");
          }
      
          // If the delete operation was successful, update the user list
          setUserList((prevUserList) => prevUserList.filter(recipe => recipe._id !== recipeId));
      
          toast.success("Recipe deleted successfully!");
          console.log("Delete response:", data);
      
        } catch (error) {
          console.error("Error deleting recipe:", error.message);
          toast.error(error.message || "Error deleting recipe.");
        }
      };
    

    

    
   




    

    return (
      <div>
        <div className="container mx-auto mt-8 px-4">
          <div className="flex flex-wrap gap-6 justify-center">
            {userList?.user?.map((recipe, index) => (
              <div
                key={index}
                className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:shadow-xl transition duration-300"
              >
                {/* Recipe Image */}
                <img
                  className="w-full h-48 object-cover"
                  src={recipe.image || "https://via.placeholder.com/400x300"}
                  alt={recipe.title || "Recipe Image"}
                />

                {/* Content Section */}
                <div className="p-4">
                  <h2 className="font-semibold text-xl text-gray-800">
                    {recipe.title || "Untitled Recipe"}
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {recipe.description ||
                      "No description provided for this recipe."}
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  {/* <button
                    onClick={() => handleUpdate(recipe._id)}
                    className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  >
                    Update
                  </button> */}
                  <button
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default UserRecipesList;
