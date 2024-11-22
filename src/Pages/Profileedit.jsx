import { Mutation, useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { FaChevronLeft } from "react-icons/fa";




const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  // Fetch user data and set it in the form
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        link: user.link || "",
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [user]);

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (data) => {
      const id = user._id; // Assuming user object contains _id
      const res = await fetch(`https://indianspciesrecipesbg.onrender.com/api/user/update/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");
      return result;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsOpen(false); // Close modal
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.message || "An unknown error occurred");
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div>
      <div className=' container mx-auto flex mt-8'>
      <span className='mt-2 text-orange-900 hover:text-orange-500'> <FaChevronLeft /></span>
      <span className='text-xl underline text-orange-900 hover:text-orange-500'> <Link to='/'>Home</Link></span>
      <button
        className="btn btn-outline rounded-full btn-sm flex justify-center items-center mt-12 m-8 hover:bg-orange-500 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </button>
      
      </div>
     
      

      {isOpen && (
        <dialog id="edit_profile_modal" className="modal" open>
          <div className="modal-box border rounded-md border-orange-400 shadow-md">
            <h3 className="font-bold text-3xl my-3 mt-5 text-orange-500">
              Update Profile
            </h3>
            <form onSubmit={handleSubmit}>
              {/* Fields */}
              {["fullname", "username", "email", "bio", "link"].map((field) => (
                <div key={field} className="mb-5">
                  <label htmlFor={field} className="text-gray-500 text-xl">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    placeholder={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="bg-gray-100 w-full text-sm mt-4 mr-5 text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    required
                  />
                </div>
              ))}

              {/* Password Fields */}
              {["newPassword", "currentPassword"].map((field) => (
                <div key={field} className="mb-5">
                  <label htmlFor={field} className="text-gray-500 text-xl">
                    {field === "newPassword" ? "New Password" : "Current Password"}
                  </label>
                  <input
                    type="password"
                    id={field}
                    name={field}
                    placeholder={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="bg-gray-100 w-full text-sm mt-4 mr-5 text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="flex flex-wrap gap-5 justify-end">
                <button
                  type="submit"
                  className="w-full py-4 px-8 text-sm tracking-wide font-semibold text-white bg-orange-500 hover:bg-orange-300 hover:text-black rounded-full"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="w-full py-4 px-8 text-sm tracking-wide font-semibold text-white bg-orange-500 hover:bg-orange-300 hover:text-black rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProfileEdit;


