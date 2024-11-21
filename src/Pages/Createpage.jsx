import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import NavBar from "../Components/Navbar";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiLogin } from "react-icons/hi";





const Createpage = () => {
  const { singleRecipe } = useContext(UserContext);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [form, setForm] = useState({
    title: "",
    ingredients: [],
    preparationSteps: [],
    cookingTime: "",
    servings: "",
    mealType: "",
    dietary: "", 
  });


   

  const { user } = useContext(UserContext);


 
  
  
 
  



  const { mutate: createPost } = useMutation({
    mutationFn: async ({ form,image }) => {

      try {
        const res = await fetch("http://localhost:4000/api/recipe/add", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify({
            title: form.title,
            ingredients: form.ingredients,
            preparationSteps: form.preparationSteps,
            cookingTime: form.cookingTime,
            servings: form.servings,
            mealType: form.mealType,
            dietary: form.dietary,
            image:image
          }),
        });

         const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create post");
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Recipe added successfully!");
      navigate("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost({ form, image });
  };

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
    const updatedSteps = form.preparationSteps.filter((_, i) => i !== index);
    setForm({ ...form, preparationSteps: updatedSteps });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleFileChange = async (e) => {
    const image = e.target.files[0]; // Get the selected file
    console.log(image);
  
    if (!image) return;
  
    const data = new FormData();
    data.append("file", image); // Add the image file to FormData
    data.append("upload_preset", "Recipes_name"); // Correct field name: "upload_preset"
    data.append("cloud_name", "dlqypjxer"); // Cloud name (optional in this context)
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlqypjxer/image/upload", // Correct endpoint
        data // Pass FormData directly
      );
  
      console.log("Uploaded Image Data:", response.data);
  
      // If you want to extract and use the URL of the uploaded image:
      const uploadedImageURL = response.data.secure_url;
      console.log("Uploaded Image URL:", uploadedImageURL);
  
      // You can set the URL to your state or perform any other action
       setImage(uploadedImageURL);
       toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading the image:", error.response?.data || error.message);
      toast.error("Image upload failed.");
    }
  };
  
  return (
    <div>
      {/* <NavBar /> */}
      <div>
        {user ? (
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
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded"
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
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Add Preparation Step
                </button>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
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

              <div>
                <label className="block text-gray-700 font-semibold mb-2">MealType</label>
                <input
                  type="text"
                  name="mealType"
                  value={form.mealType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Dietary</label>
                <input
                  type="text"
                  name="dietary"
                  value={form.dietary}
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
          <div className=" container mx-auto mt-12 items-center ">
            <Link to='/login'>
            <button className="bg-orange-500 p-5 rounded-3xl m-8  underline text-white">
            <span className="ml-8 text-white"><HiLogin /></span>
              Login</button>
            </Link>
            
            
          </div>

           
          
        )}
      </div>
    </div>
  );
};

export default Createpage;
