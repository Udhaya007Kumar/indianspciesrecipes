import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import logo from '../assets/logo.jpg'
import { FaSearch } from "react-icons/fa";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";




const Navbar = () => {


   const { searchQuery,setSearchQuery } = useContext(UserContext);
   const [isNavOpen, setIsNavOpen] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   ;
 


   
   const { user,searchTerm,setSearchTerm } = useContext(UserContext)




   //Search 
   const navigate = useNavigate();

   const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate('/search');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when "Enter" key is pressed
    }
  };

 




  const { mutate:logout } = useMutation({
    mutationFn: async () => {
      try {
        const res= await fetch("http://localhost:4000/api/auth/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"       
          }, 
        })
        const response = await res.json();
        if (!res.ok) {
          throw new Error(response.error || "Logout failed");
        } 

      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Login Suuccess!");
      window.location.href = "/login";
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

   



 
// Toggle dropdown visibility
   
      // Toggle navbar function
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


   
    

    console.log(user);
    

    return (
      <div>
        <nav className=" border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img className="w-20 h-20 rounded-full " src={logo} alt="" />
            </Link>
            <button
              onClick={toggleNav}
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isNavOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`${
                isNavOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                    onClick={() => toggleClose()}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() => toggleClose()}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() => toggleClose()}
                  >
                    Create
                  </Link>
                </li>
              </ul>
            </div>

            {/* //search */}
            <div className=" relative">
              <div>
                <h5 className="flex items-center space-x-2 relative right-0">
                <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Listen for "Enter" key
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
                    <button
                    onClick={handleKeyDown}
                    className="absolute top-3 right-4  transform -translate-y-1/2 text-gray-500 cursor-pointer bottom-8"
                  >
                    <FaSearch />
                  </button>
                </h5>
              </div>
            </div>

            {user ? (
              <div className="relative mt-5 ">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none "
                >
                  <img
                    src={user.profileimg} // Replace with user's profile picture URL
                    alt="User"
                    className="w-20 h-20 rounded-full border border-gray-300"
                  />
                  <span className="hidden md:block">{user.username}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 ">
                      <Link to="/profile">Profile</Link>
                    </button>

                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => logout()} // Replace with logout logic
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative mt-5 pl-5">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src="https://via.placeholder.com/40" // Replace with user's profile picture URL
                    alt="User"
                    className="w-30 h-50 rounded-full border border-gray-300"
                  />
                  <span className="hidden md:block"></span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
                    <Link to="/login">
                      <a
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    );
};

export default Navbar;