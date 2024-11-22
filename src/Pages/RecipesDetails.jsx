import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import NavBar from '../Components/Navbar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BiLike} from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";





const RecipesDetails = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); 
  const [rating, setRating] = useState("");  // To manage the rating input

  // const [likesCount, setLikesCount] = useState(0)

  
  const {selectedId,setSelectedId,singleRecipe,user}=useContext(UserContext);

  const { id } = useParams(); 
  setSelectedId(id);



    const handleLikeUnlike = async () => {
      try {
        const { data } = await axios.post(
          `https://indianspciesrecipesbg.onrender.com/api/recipe/like/${selectedId}`,
          {}, // No data payload for this request
          {
            withCredentials: true, // Ensures cookies are included
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        toast.success("Like added successfully!");
        setIsLiked(!isLiked); // Toggle like state
      } catch (error) {
        console.error('Error toggling like status:', error);
        toast.error(error?.response?.data?.message || "Failed to add Like");
      }
    };

    //Cooment
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!commentText.trim()) {
          setError('Please provide text');
          return;
      }

      try {
          const response = await axios.post(
              `https://indianspciesrecipesbg.onrender.com/api/recipe/comment/${selectedId}`,
            { text: commentText },  // Your data payload
            {
                withCredentials: true,  // Include cookies with the request
                headers: {
                    "Content-Type": "application/json",  // Ensures JSON is sent
                },
            }
        );

         toast.success("Comment added successfully!");
          setMessage('Comment added successfully');
          setError('');
          setCommentText('');
      } catch (error) {
          setError('Failed to add comment');
          setMessage('');
          toast.error(error?.response?.data?.message || "Failed to add Comment");
      }
  };


  const handleRatingSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
  
    try {
      const response = await axios.post(' https://indianspciesrecipesbg.onrender.com/api/recipe/rating',`/${selectedId}`,
        { rating }, // Your data payload
        {
          withCredentials: true,  // Include cookies with the request
          headers: {
            "Content-Type": "application/json",  // Ensures JSON is sent
          },
        }
      );
  
      // Show success toast if request is successful
      toast.success("Rating added successfully!");
    } catch (error) {
      // Show error toast if something goes wrong
      toast.error(error?.response?.data?.message || "Failed to add rating");
    }
  };


// console.log(singleRecipe.recipe.title);



    return (
      <div>
        <div className="container mx-auto p-6 bg-gray-50 text-gray-800 mt-8">
          <h1 className="text-4xl font-bold text-center mb-6">
            Recipe Details
          </h1>

          {/* Recipe Image */}
          <div className="flex justify-center">
            <img
              src={
                singleRecipe?.recipe?.image ||
                "https://via.placeholder.com/400x300"
              }
              alt={singleRecipe?.recipe?.title || "Recipe Image"}
              className="w-full max-w-lg rounded-lg shadow-md"
            />
          </div>

          {/* Recipe Title */}
          <h1 className="text-4xl font-bold text-center mt-8">
            {singleRecipe?.recipe?.title}
          </h1>

          {/* Ingredients */}
          <div className="mt-12">
            <h2 className="font-bold mb-6 text-3xl">Ingredients:</h2>
            <ul className="list-disc pl-8 space-y-2 text-lg text-gray-600">
              {singleRecipe?.recipe?.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Preparation Steps */}
          <div className="mt-12">
            <h2 className="font-bold mb-6 text-3xl">Preparation Steps:</h2>
            <ul className="list-decimal pl-8 space-y-2 text-lg text-gray-600">
              {singleRecipe?.recipe?.preparationSteps?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          {/* Cooking Time */}
          <div className="mt-12">
            <h2 className="font-bold mb-4 text-3xl">Cooking Time:</h2>
            <p className="text-lg text-gray-700">
              {singleRecipe?.recipe?.cookingTime} min
            </p>
          </div>

          {/* Servings */}
          <div className="mt-8">
            <h2 className="font-bold mb-4 text-3xl">Servings:</h2>
            <p className="text-lg text-gray-700">
              {singleRecipe?.recipe?.servings}
            </p>
          </div>

          {/* Additional Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-12 space-y-6 md:space-y-0">
            <div>
              <h2 className="font-bold text-2xl">
                Meal Type:{" "}
                <span className="text-orange-500">
                  {singleRecipe?.recipe?.mealType}
                </span>
              </h2>
            </div>
            <div>
              <h2 className="font-bold text-2xl">
                Dietary:{" "}
                <span className="text-orange-500">
                  {singleRecipe?.recipe?.dietary}
                </span>
              </h2>
            </div>
          </div>
        </div>


       {/* Rating */}
        {user ? (
          <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="font-bold text-2xl mb-4 text-gray-800">
              Rate this Recipe
            </h2>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter rating (1-5)"
              className="border border-gray-300 rounded-md p-2 w-full mt-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mt-3 w-full transition duration-200"
              onClick={handleRatingSubmit}
            >
              Submit Rating
            </button>
            <div className="space-y-4">
              {singleRecipe?.recipe?.ratings.map((rate, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-orange-500 text-lg border-b border-gray-200 pb-2"
                >
                  <span className="text-gray-700 font-medium">
                    {rate.rating}
                  </span>
                  <FaStar className="text-orange-500" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-4xl mb-6 text-gray-800">Ratings</h2>
            <div className="space-y-4">
              {singleRecipe?.recipe?.ratings.map((rate, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-orange-500 text-lg border-b border-gray-200 pb-2"
                >
                  <span className="text-gray-700 font-medium">
                    {rate.rating}
                  </span>
                  <FaStar className="text-orange-500" />
                </div>
              ))}
            </div>
          </div>
        )}

          {/* Like */}
         <div className=" container mx-auto  bg-gray-50 text-gray-800 mt-8 flex items-center space-x-4">
          <h2 className="font-bold mb-4 text-2xl mt-2">Like Recipes</h2>

        {
          user ?
          (
            <>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLikeUnlike}
                  className={`px-4 py-2 rounded-md font-medium text-white transition ${
                    isLiked
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-orange-500 hover:bg-orange-200"
                  }`}
                >
                  {isLiked ? "Unlike" : "Like"}
                </button>
                {/* <span className="text-gray-700 font-semibold">{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span> */}
              </div>
            </>

          ):
          (
            <>
              <Link to="/login"></Link>
            </>
          )
        }
        </div>

        {
          user ?(
            <div className="container mx-auto ">
            <div>
              <h2 className="font-bold mb-4 text-2xl">Add a Comment</h2>
              {message && <p>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={handleSubmit}>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  style={{ width: "100%", marginBottom: "10px" }}
                  className="border border-gray-300 rounded-md p-2 w-full mt-3"
                />
                <button
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded mb-5 ml-5"
                  type="submit"
                >
                  Submit Comment
                </button>
              </form>
            </div>
  
            {singleRecipe?.recipe?.comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span className="font-semibold text-gray-700">
                    {comment.user || "Anonymous"}
                  </span>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-800">{comment.text}</p>
              </div>
            ))}    
          </div>
            
          ):(
            <div className='container mx-auto mb-5'>
              <Link to='/login'>
              <button className='bg-orange-500 p-3 rounded-xl'>Commant</button>
              </Link>
              {singleRecipe?.recipe?.comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span className="font-semibold text-gray-700">
                    {comment.user || "Anonymous"}
                  </span>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-800">{comment.text}</p>
              </div>
            ))}    
            </div>
          )
        }


       


       











      </div>
    );
};

export default RecipesDetails;