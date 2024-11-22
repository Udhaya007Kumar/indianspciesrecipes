import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { FaArrowLeft } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import toast from "react-hot-toast";
import axios from 'axios';

const Profile = () => {
  const [uploading, setUploading] = useState(false);

  const { user,userList,setUserList } = useContext(UserContext); // Corrected from 'authUser' to 'user'

  const [coverimg, setCoverImg] = useState(null);
  const [profileimg, setProfileImg] = useState(null);
  const coverFileInputRef = useRef(null);
  const profileFileInputRef = useRef(null);
   // Initialize as an empty array

  // Handle Cover Image Upload
  const handleCoverFileChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Recipes_name");
    data.append("cloud_name", "dlqypjxer");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlqypjxer/image/upload",
        data
      );
      const uploadedImageURL = response.data.secure_url;
      setCoverImg(uploadedImageURL);
      toast.success("Cover image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading the image:", error.response?.data || error.message);
      toast.error("Cover image upload failed.");
    }
  };

  // Handle Profile Image Upload
  const handleProfileFileChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Recipes_name");
    data.append("cloud_name", "dlqypjxer");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlqypjxer/image/upload",
        data
      );
      const uploadedImageURL = response.data.secure_url;
      setProfileImg(uploadedImageURL);
      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading the image:", error.response?.data || error.message);
      toast.error("Profile image upload failed.");
    }
  };

  // Handle Cover Image Save
  const handleCoverSaveClick = async () => {
    if (!coverimg) {
      toast.error("No image uploaded!");
      return;
    }

    try {
      const res = await fetch("https://indianspciesrecipesbg.onrender.com/api/user/updatecoverimage", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent for session-based authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coverimg: coverimg,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update cover image.");
      }

      toast.success("Cover image updated successfully!");
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error updating cover image:", error.message);
      toast.error(error.message || "Error updating cover image.");
    }
  };

  // Handle Profile Image Save
  const handleProfileSaveClick = async () => {
    if (!profileimg) {
      toast.error("No image uploaded!");
      return;
    }

    try {
      const res = await fetch("https://indianspciesrecipesbg.onrender.com/api/user/updateprofileimage", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent for session-based authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileimg: profileimg,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile image.");
      }

      toast.success("Profile image updated successfully!");
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error updating profile image:", error.message);
      toast.error(error.message || "Error updating profile image.");
    }
  };

  const handUserGetlist = async () => {
    try {
      const res = await fetch(`https://indianspciesrecipesbg.onrender.com/api/user/userrecipe/${user?._id}`, {
        method: "POST", // Change to GET if no payload is sent
        credentials: "include", // Ensure cookies are sent for session-based authentication
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user recipe list.");
      }
  
      // Update the state with the fetched data
      setUserList(data);
      toast.success("User recipe list fetched successfully!");
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error fetching user profile list:", error.message);
      toast.error(error.message || "Error fetching user profile.");
    }
  };
  

  






  return (
    <div className="container mx-auto mt-5">
      {/* Header */}
      <div className="flex gap-4 px-4 py-2 items-center">
        <Link to="/">
          <FaArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <div className="flex flex-col">
          <p className="font-bold text-xl">{user?.fullname || "User Name"}</p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative group/cover">
        <img
          src={user?.coverImg || "default-cover.jpg"}
          className="h-52 w-full object-cover rounded-lg"
          alt="cover image"
        />
        <div
          className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
          onClick={() => coverFileInputRef.current.click()}
        >
          <MdEdit className="w-5 h-5 text-white" />
        </div>
        
        <input
          type="file"
          hidden
          accept="image/*"
          ref={coverFileInputRef}
          onChange={handleCoverFileChange}
        />
        
        <button
          className="mt-2 p-2 bg-orange-500 text-white rounded"
          onClick={handleCoverSaveClick}
        >
          Save Cover Image

        </button>
        <div className='flex justify-end '>
          <Link to={`/profile/${user?._id || 'default'}`}>
          <span  className='bg-orange-300 p-3 rounded-2xl' >edit</span>
          </Link>
      
      </div>
        
       
      </div>
      
      

      {/* Profile Image */}
      <div className="avatar top-8">
        <div className="w-32 h-32 rounded-full relative group/avatar">
          <img
            src={user?.profileimg || "default-profile.jpg"}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
            <MdEdit className="w-5 h-5 text-white" onClick={() => profileFileInputRef.current.click()} />
          </div>
        </div>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={profileFileInputRef}
          onChange={handleProfileFileChange}
        />
        <button
          className="mt-2 text-orange-500 underline"
          onClick={handleProfileSaveClick}
        >
          Save Profile Image
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-4 mt-14 px-4">
        <h1 className="font-bold text-3xl text-gray-800">{user?.fullname || 'Full Name'}</h1>
        <h2 className="text-xl text-slate-500">@{user?.username || 'username'}</h2>
        <span className="text-sm text-gray-600 my-1">{user?.bio || 'This is a user bio'}</span>
        <span className="text-sm text-blue-600 my-1">{user?.link || 'https://github.com/johndoe'}</span>
        <span className="text-sm text-gray-600 my-1">{user?.email || 'email@example.com'}</span>
      </div>


      <div className='container mx-auto mt-8'>
        <Link to={`/userrecipes/${user?._id}`}>
        <button className='mt-2 p-2 bg-orange-500 text-white rounded '
        onClick={handUserGetlist}>UserPost...</button>
        </Link>  
      </div>


    </div>
  );
};

export default Profile;
