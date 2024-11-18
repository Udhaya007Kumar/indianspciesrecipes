import React, { useContext, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import NavBar from '../Components/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';



const Profile = () => {


  const{data:authUser}=useQuery({
    queryKey:["authUser"]})
  
  // const user = {
  //   fullName: 'John Doe',
  //   username: 'johndoe',
  //   bio: 'Web developer with a passion for coding and technology.',
  //   link: 'https://github.com/johndoe',
  //   createdAt: '2020-10-01',
  //   following: 150,
  //   followers: 200,
  
  // };
  console.log(authUser);
  



  const fileInputRef = useRef(null);

  const imageHandleClick = () => {
    // Trigger the file input click when the edit icon is clicked
    fileInputRef.current.click();
  };

  const handleImgChange = (e, type) => {
    // Handle image file change
    const file = e.target.files[0];
    if (file) {
      // Do something with the file (e.g., upload, preview, etc.)
      console.log(`${type} image selected:`, file);
    }
  };


  const profileHandleClick = () => {
    // Handle profile click
    console.log('Profile clicked');
  };
  
  return (
    <div className="container mx-auto mt-5">
      {/* header  */}
      <div className="flex gap-10 px-4 py-2 items-center">
        <Link to="/">
          <FaArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex flex-col">
          <p className="font-bold text-lg">{authUser.fullName}</p>
        </div>
      </div>

      {/* coverImage */}
      <div className="relative group/cover">
        <img
          src={authUser.user.coverImg}
          className="h-52 w-full object-cover"
          alt="cover image"
        />
        <div
          className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
          onClick={imageHandleClick}
        >
          <MdEdit className="w-5 h-5 text-white" />
        </div>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleImgChange(e, "coverImg")}
        />

        <div className="avatar absolute -bottom-16 left-12">
          <div className="w-32 rounded-full relative group/avatar">
            <img
              src={authUser.user.profileImg}
              alt="profile"
            />
            <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
              <MdEdit
                className="w-4 h-4 text-white"
                onClick={profileHandleClick}  
              />
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-end px-4 mt-5">
        <Link to="/profileEdit"><button className="btn btn-outline rounded-full btn-sm">Edit</button></Link>
        
      </div>

      <div className="flex flex-col gap-4 mt-14 px-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">{authUser.user.fullname}</h1>   
          <h1 className="text-xl  text-slate-500">@{authUser.user.username}</h1>
          <span className="text-sm my-1">{authUser.user.bio}</span>
          <span className="text-sm my-1">{authUser.user.link || "https://github.com/johndoe" }</span>
          <span className="text-sm my-1">{authUser.user.email}</span>
        </div>





      </div>

      


    </div>
  );
};

export default Profile;