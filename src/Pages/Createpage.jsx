import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import NavBar from "../Components/Navbar";
import axios from "axios";
import Cookies from 'js-cookie';
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";


import toast from "react-hot-toast";

const Createpage = () => {
  
  const { singleRecipe } = useContext(UserContext);
  const navigate = useNavigate();



  // const isAuthenticated = !!Cookies.get('jwt') !== undefined;

  // console.log(isAuthenticated);
  

  // if (isAuthenticated) {
  //   console.log('User is authenticated');
  // } else {
  //   console.log('User is not authenticated');
  // }



  const [form, setForm] = useState({
    title: "", 
    ingredients: [],
    preparationSteps: [],
    cookingTime: "",
    servings: "", 
  });
   const [img,setImg]= useState(null);
   const imgRef =useRef(null);

   const{data:authUser}=useQuery({
    queryKey:["authUser"]})

    console.log(authUser);
    

    const queryClient = useQueryClient();
   
    


    const {mutate: createPost,isPending,isError,error}=useMutation({
      mutationFn: async ({form}) => {
        try {
          const res= await fetch("http://localhost:4000/api/recipe/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            
            body: JSON.stringify({

              form             
            }),
            withCredentials: true
          })
          
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to create post");
          console.log(data);
          return data;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        // setImg(null);
        // setForm("");
        toast.success("Recipe add Suuccess!")
        queryClient.invalidateQueries({ queryKey: ["posts"] });
       
      }
    })











  
  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost({form});
   
  };






  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(form);
  //   try {
      
  //     const token = localStorage.getItem('token'); // or from cookies
        
  //     // Attach token in headers
  //     await axios.post("http://localhost:4000/api/recipe/add", form, {
  //         headers: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     });
      
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:4000/api/recipe/add', formData, )
  //     console.log('Recipe added:', response.data);
  //   } catch (error) {
  //     setError(error.response ? error.response.data.error : 'Something went wrong');
  //   }
  // };





  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...form.ingredients];
    updatedIngredients[index] = e.target.value;
    setForm({ ...form, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setForm((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    const updatedIngredients = form.ingredients.filter((_, i) => i !== index);
    setForm({ ...form, ingredients: updatedIngredients });
  };

  const handleStepChange = (e, index) => {
    const updatedSteps = [...form.preparationSteps];
    updatedSteps[index] = e.target.value;
    setForm({ ...form, preparationSteps: updatedSteps });
  };

  const addStep = () => {
    setForm((prev) => ({
      ...prev,
      preparationSteps: [...prev.preparationSteps, ""],
    }));
  };

  const removeStep = (index) => {
    setForm({
      ...form,
      preparationSteps: form.preparationSteps.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div>
      <NavBar />

      <div>
        {
          authUser ? (
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
            {form.ingredients.map((ingredient, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(e, index)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Ingredient
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Preparation Steps</label>
            {form.preparationSteps.map((step, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(e, index)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Preparation Step
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cooking Time</label>
            <input
              type="number"
              name="cookingTime"
              value={form.cookingTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Servings</label>
            <input
              type="number"
              name="servings"
              value={form.servings}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded"
          >
            Submit Recipe
          </button>
        </form>
      </div>
          ) : (
           <h1>login</h1>
          )
        }
      </div>
      
    </div>
  );
};

export default Createpage;
