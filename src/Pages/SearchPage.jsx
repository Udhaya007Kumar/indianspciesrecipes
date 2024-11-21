import React, { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const { data, searchTerm } = useContext(UserContext);

  const filteredRecipes =
    data?.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div>
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-wrap gap-5 justify-center ">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:shadow-2xl  transition duration-300"
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
                  to="/"
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded shadow transition duration-200"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
