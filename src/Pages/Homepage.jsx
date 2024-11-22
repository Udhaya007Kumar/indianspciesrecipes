import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const Homepage = () => {
  const { data, user } = useContext(UserContext);


  console.log(user);
  
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  // Calculate indexes for the current page
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = data?.recipes?.slice(indexOfFirstRecipe, indexOfLastRecipe) || [];

  // Handle next and previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(data?.recipes.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex flex-wrap gap-5 justify-center">
        {
          currentRecipes.map((recipe, index) => (
            <div  key={recipe._id} class="bg-white rounded-lg shadow-md overflow-hidden">
    <Link to={`/recipe/${recipe._id}`}>
                <img
                  className="w-full h-48 object-cover"
                  src={recipe.image || "https://via.placeholder.com/400x300"}
                  alt={recipe.title || "Recipe Image"}
                />
              </Link>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{recipe.title || "Untitled Recipe"}</h3>
      <p className="text-gray-600 text-sm mt-1">
      Ingredients: <span className="font-medium">{recipe.ingredients || "Recipe ingredients"}</span>
      </p>
     
      <p className="text-gray-600 text-sm mt-1">
        Cooking Time: <span className="font-medium">{recipe.cookingTime || "Recipe cookingTime"}min</span>
      </p>
      <p className="text-gray-600 text-sm mt-1">
        Servings: <span className="font-medium">{recipe.servings || "Recipe servings"}</span>
      </p>
      <div className="mt-4 flex justify-between items-center">
        <Link to={`/recipe/${recipe._id}`} >
        <button className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text-sm">
          View Recipe
        </button>
        </Link>
       
        <div className="flex items-center space-x-1 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{recipe.likes.length}</span>
        </div>
      </div>
    </div>
  </div>
          ))

        }
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-orange-500 text-white px-4 py-2 rounded-l-md disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="px-4 py-2">{`Page ${currentPage}`}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === Math.ceil(data?.recipes.length / itemsPerPage)}
            className="bg-orange-500 text-white px-4 py-2 rounded-r-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
    </div>
    
  );
};

export default Homepage;
