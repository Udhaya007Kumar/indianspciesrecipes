import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import logo from '../assets/logo.jpg'

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";





const Login = () => {



    const [formData, setFormData] = useState({
        username: "",
        password:"",
      });
    
    
      const navigate = useNavigate();

      const [authUser, setAuthUser] = useState(null); // Step 1: Declare the authUser state

      const {
        mutate: loginMutation,
        isPending,
      } = useMutation({
        mutationFn: async ({ username, password }) => {
          try {
            const res = await fetch("http://localhost:4000/api/auth/login", {
              method: "POST",
              credentials: "include", // Includes cookies in cross-origin requests
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json", // Fix the typo here: "Accpet" -> "Accept"
              },
              body: JSON.stringify({
                username,
                password,
              }),
            });
    
            const data = await res.json();
    
            if (!res.ok) throw new Error(data.error || "login failed");
            console.log(data);
    
            // Step 2: Set JWT and role in cookies
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 1); // Set expiration to 1 hour from now
    
            // Set JWT and role in cookies
            document.cookie = `jwt=${data.token}; expires=${expirationDate.toUTCString()}; path=/; Secure; HttpOnly`;
            document.cookie = `role=${data.role}; expires=${expirationDate.toUTCString()}; path=/; Secure; HttpOnly`;
    
            // Optionally: Store the token and role in localStorage (if needed)
            // localStorage.setItem("token", data.token);
            // localStorage.setItem("role", data.role);
    
            return data;
          } catch (error) {
            console.error(error);
            throw new Error(error.message); // Rethrow the error
          }
        },
        onSuccess: (data) => {
          toast.success("Login Success!");
    
          // Step 3: Set the authUser state with the token and role
          setAuthUser({ token: data.token, role: data.role }); // Store the token and role in authUser state
    
          navigate("/"); // Navigate to the home or dashboard page
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });

      if(authUser){
        console.log(authUser);
      }else{
        console.log("not logged in");
      }
        



  



      
  // const {
  //   mutate: loginMutation,
  //   isPending,
  // } = useMutation({
  //   mutationFn: async ({ username, password }) => {
  //     try {
  //       const res = await fetch("http://localhost:4000/api/auth/login", {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accpet: "application/json",
  //         },
  //         body: JSON.stringify({
  //           username,
  //           password,
  //         }),
  //       });
        
  //       const data = await res.json();
        
  //       if (!res.ok) throw new Error(data.error || "login failed");
  //       console.log(data);
  //       return data;
  //     } catch (error) {
  //       console.error(error);
  //       throw new Error(error.message); // Rethrow the error;
  //     }
  //   },
  //   onSuccess: () => {
  //     toast.success("Login Suuccess!");
  //     navigate("/")
  //     //toast.success("Account created successfully");
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });






  const handleSubmit =  async (e) => {
    e.preventDefault();
    loginMutation(formData);
    
  }


    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    return (
        <div>
        <div className="flex flex-col justify-center font-[sans-serif] p-12"></div>
  
        <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_rgba(195,169,50,0.5)] p-8 relative mt-12">
          <div className="bg-white w-24 h-24 border-[10px] p-1.5 absolute left-0 right-0 mx-auto -top-12 rounded-full overflow-hidden">
            <div>
            <img src={logo} alt="Logo" className="w-full "  />;
            </div>
          </div>
          <form className="mt-12" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-orange-500 mb-8 text-center">
              Login Page
            </h3>
  
            <div className="mb-5">
              <label
                htmlFor="username"
               className="text-orange-500 "
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
               className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                placeholder="Enter Your username"
                required
              />
            </div>
  
            <div className="mb-5">
              <label
                htmlFor="password"
               className="text-orange-500 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-100 w-full text-sm mt-4  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                placeholder="Enter Your password"
                required
              />
            </div>
  
            <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-4 px-8 text-sm tracking-wide font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
                >
                   {isPending ? "Loading..." : " Login"}  
                
                </button>
              </div>
  
  
               <p className="text-sm mt-8 text-center text-gray-800">
               create new  account?{" "}
                <Link
                  to='/signup'
                  className="text-orange-500 font-semibold hover:underline ml-1"
                >
                    Sign up
                </Link>
              </p>   
  
          </form>
        </div>
      </div>
    );
};

export default Login;