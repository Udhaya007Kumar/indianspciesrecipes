import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { FaArrowLeft } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

const Profile = () => {
  const { user } = useContext(UserContext); // Corrected from 'authUser' to 'user'
  const fileInputRef = useRef(null);

  // Handle image clicks and changes
  const imageHandleClick = () => {
    fileInputRef.current.click();
  };

  const handleImgChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`${type} image selected:`, file);
    }
  };

  console.log(user?._id);
  

  return (
    <div className="container mx-auto mt-5">
      {/* Header */}
      <div className="flex gap-4 px-4 py-2 items-center">
        <Link to="/">
          <FaArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <div className="flex flex-col">
          <p className="font-bold text-xl">{user?.fullname || 'User Name'}</p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative group/cover">
        <img
          src={user?.coverImg || 'default-cover.jpg'}
          className="h-52 w-full object-cover rounded-lg"
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
          onChange={(e) => handleImgChange(e, 'coverImg')}
        />

        {/* Profile Image */}
        <div className="avatar absolute -bottom-16 left-12">
          <div className="w-32 h-32 rounded-full relative group/avatar">
            <img
              src={user?.profileImg || 'default-profile.jpg'}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
              <MdEdit className="w-5 h-5 text-white" onClick={() => console.log('Edit profile clicked')} />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end px-4 mt-6">
        <Link  to={`/profile/${user?._id || 'default'}`}>
          <button className="btn btn-outline rounded-full btn-sm">Edit Profile</button>
        </Link>
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-4 mt-14 px-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl text-gray-800">{user?.fullname || 'Full Name'}</h1>
          <h2 className="text-xl text-slate-500">@{user?.username || 'username'}</h2>
          <span className="text-sm text-gray-600 my-1">{user?.bio || 'This is a user bio'}</span>
          <span className="text-sm text-blue-600 my-1">{user?.link || 'https://github.com/johndoe'}</span>
          <span className="text-sm text-gray-600 my-1">{user?.email || 'email@example.com'}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
