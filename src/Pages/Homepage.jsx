import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const Homepage = () => {
  const { data, user } = useContext(UserContext);
  
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
    <div>
      {/* Navbar - Uncomment if needed */}
      {/* <Navbar /> */}
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-wrap gap-5 justify-center">
          {currentRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:shadow-2xl transition duration-300"
            >
              <Link to={`/recipe/${recipe._id}`}>
                <img
                  className="w-full h-48 object-cover"
                  src={recipe.image || "https://via.placeholder.com/400x300"}
                  alt={recipe.title || "Recipe Image"}
                />
              </Link>
              <div className="p-4">
                <h2 className="font-bold text-2xl text mb-2 text-gray-800">
                  {recipe.title || "Untitled Recipe"}
                </h2>
              </div>
              <div className="px-4 pb-4 flex justify-end">
                <Link
                  to={`/recipe/${recipe._id}`}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded shadow transition duration-200"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Homepage;
