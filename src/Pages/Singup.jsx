import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import logo from '../assets/logo.jpg'
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";




const Singup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname:"",
    email:"",
    password:"",
  });


  const navigate = useNavigate();

  const {mutate,isPending,isError,error} = useMutation({
    mutationFn: async ({username,fullname,email,password}) => {
      try {
        const res =await fetch("http://localhost:4000/api/auth/signup",{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json",
            "Accpet":"application/json"
          },
          body:JSON.stringify({
            username,fullname,email,password
          })
        })
          
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;

        
        
      } catch (error) {
        console.error(error);
				throw error;
        
      }
    },


    onSuccess :()=>{
      toast.success('Successfully toasted!')
       //toast.success("Account created successfully");
       navigate("/login")
       
    },

    onError:(error)=>{
      toast.error(error.message);

    }
  });


  const handleSubmit =  async (e) => {
      e.preventDefault();
      mutate(formData)   
      
    };



  // const handleSubmit =  async (e) => {
  //   e.preventDefault();
  //   try {
  //       await axios.post("http://localhost:4000/api/auth/signup",formData)
  //       navigate("/login")

  //   } catch (error) {
  //       console.log(error);
        
  //   }
  // };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  



  return (
    <div>
      <div className="flex flex-col justify-center font-[sans-serif] p-8"></div>

      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_rgba(195,169,50,0.5)] p-8 relative mt-12">
        <div className="bg-white w-24 h-24 border-[10px] p-1.5 absolute left-0 right-0 mx-auto -top-12 rounded-full overflow-hidden">
        <div>
            <img src={logo} alt="Logo" className="w-full "  />;
            </div>
        </div>
        <form className="mt-12" onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-orange-500 mb-8 text-center">
            Create free account
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
              className="bg-gray-100 w-full text-sm mt-4  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter Your username"
              required
            />
          </div>


          <div className="mb-5">
            <label
              htmlFor="fullname"
             className="text-orange-500 "
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="bg-gray-100 w-full text-sm mt-4  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter Your fullname"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
             className="text-orange-500 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 w-full text-sm mt-4  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter Your email"
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
                
                 {isPending ? "Loading..." : " Create an account"}   
              </button>
              
            </div>
            </form>
           



            <p className="text-sm mt-8 text-center text-gray-800">
            {isError && <p className='text-red-500'>{error.message}</p>}  
              Already have an account?{" "}
              <Link
                to='/login'
                className="text-orange-500 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>  

      
      </div>
    </div>
  );
};

export default Singup;
