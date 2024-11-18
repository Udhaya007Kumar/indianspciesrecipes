import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import UserContext from '../Context/UserContext';
import { Link } from 'react-router-dom';



const Homepage = () => {
  const { data, setData } = useContext(UserContext);
  
  

  return (
    <div>
      <Navbar />
      <div className="flex container mx-auto mt-8 gap-5 flex-wrap">
        {data?.recipes?.map((recipe, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white w-full sm:w-1/2 lg:w-1/4">
            <Link to={`/recipe/${recipe._id}`}>
            
            <img
              className="w-full"
              src={recipe.image || "https://via.placeholder.com/400x300"}
              alt="Card Image"
            />
            </Link>
            <h1>{recipe._id}</h1>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{recipe.title}</div>
              <p className="text-gray-700 text-base">
                {recipe.description || "This is a description for the card."}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2 gap-2">
              <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded">
                Add to fav
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
