import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import NavBar from '../Components/Navbar';



const RecipesDetails = () => {



    const {selectedId,setSelectedId,singleRecipe}=useContext(UserContext);

    const { id } = useParams(); 
    setSelectedId(id);
    //console.log(singleRecipe);
    

    return (
        <div>
            <NavBar />

            <div className="container mx-auto p-6 bg-gray-50 text-gray-800 mt-8">
           <h1 className="text-4xl font-bold ">Recipes Details</h1>
      

      <div className="flex justify-center">
        <img src={singleRecipe?.recipe?.image || "https://via.placeholder.com/400x300"} alt={singleRecipe?.recipe?.title} className="w-1/2" />
      </div>
      <h1 className="text-4xl font-bold text-center mb-6 mt-8">{singleRecipe?.recipe?.title}</h1>

      <div className="justify-center mt-12">
        <h2 className="font-bold mb-4 text-4xl ">Ingredients:</h2>
        <ul className="list-disc pl-6  text-slate-500 text-3xl indent-8">
          {singleRecipe?.recipe?.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* //preparationSteps */}
      <div className="mt-8 justify-center">
        <h2 className=" font-bold mb-4 text-4xl ">preparationSteps:</h2>
        <ul className="list-disc pl-6 text-3xl text-slate-500 ">
          {singleRecipe?.recipe?.preparationSteps?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* cookingTime */}
      <div className="mt-8 justify-center">
      <h2 className=" font-bold mb-4 text-4xl ">cookingTime:</h2>
      <h1 className="list-disc pl-6 text-3xl text-slate-500">{singleRecipe?.recipe?.cookingTime}min</h1>

      </div>

      {/* description */}
      <div className="mt-8 justify-center">
      <h2 className=" font-bold mb-4 text-4xl ">servings:</h2>
      <h1 className="list-disc pl-6 text-3xl text-slate-500">{singleRecipe?.recipe?.servings}</h1>
      </div>
    </div>

        </div>
    );
};

export default RecipesDetails;