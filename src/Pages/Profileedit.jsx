import { Mutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";





const Profileedit = () => {

	const{data:authUser}=useQuery({
        queryKey:["authUser"]})

		console.log(authUser.user._id);
		

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

	// const{  mutate: loginMutation, isPending,isError,error, } =useMutation({
	// 	mutationFn: async (fullname,username,email,bio,link,newPassword,currentPassword) => {
	// 		try {
	// 			const id=authUser.user._id
	// 			console.log(id);
				
	// 			const res = await fetch(`http://localhost:4000/api/user/update/${id}`, {
	// 				method: "POST",
					
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					fullname,
	// 					username,
	// 					email,
	// 					bio,
	// 					link,
	// 					newPassword,
	// 					currentPassword
	// 				}),
	// 			});
	// 			const data = await res.json();
	// 			if (!res.ok) {
	// 				throw new Error(data.error || "Something went wrong");
	// 			}
	// 			return data;
	// 		} catch (error) {
	// 			throw new Error(error.message);
	// 		}
	// 	},
	// 	onSuccess: () => {
	// 		toast.success("Profile updated successfully");
	// 	},	
	// 	onError: (error) => {
	// 		toast.error(error.message);
	// 	}
	// })


	
	

    const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
    

        useEffect(() => {
            if(authUser){
                setFormData({
                    fullName: authUser.user.fullname,
                    username: authUser.user.username,
                    email: authUser.user.email, 
                    bio: authUser.user.bio,
                    link: authUser.user.link,
                    newPassword: "",
                    currentPassword: "",    

                    
                })
            }
                        
        }, [authUser]);


        const handleSubmit =  (e) => {
            e.preventDefault();
            //console.log(formData);
			loginMutation(formData);
			
			
			
            
        };




 

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };	
    

    return (
      <div>
        <button
          className="btn btn-outline rounded-full btn-sm flex justify-center items-center mt-12 m-8 hover:bg-orange-500 hover:text-white"
          onClick={handleOpenModal}
        >
          Edit Profile
        </button>

        {isOpen && (
          <dialog id="edit_profile_modal" className="modal" open>
            <div className="modal-box border rounded-md border-orange-400 shadow-md">
              <h3 className="font-bold text-3xl my-3 mt-5 text-orange-500">
                Update Profile
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-5 mt-8">
                  <label htmlFor="fullname" className="text-orange-500 ">
                    Fullname
                  </label>
                  <input
                    type="text"
                    placeholder="fullname"
                    className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    value={formData.fullname}
                    name="fullname"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="username" className="text-orange-500 ">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    value={formData.username}
                    name="username"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="text-orange-500 ">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="bio" className="text-orange-500 ">
                    bio
                  </label>
                  <input
                    type="text"
                    placeholder="bio"
                    className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    value={formData.bio}
                    name="bio"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="link" className="text-orange-500 ">
                    Link
                  </label>
                  <input
                    type="text"
                    placeholder="link"
                    className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    value={formData.link}
                    name="link"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="newPassword" className="text-orange-500 ">
                    NewPassword
                  </label>
                  <input
                    type="password"
                    placeholder="newPassword"
                    className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    value={formData.newPassword}
                    name="newPassword"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="link" className="text-orange-500 ">
                    currentPassword
                  </label>
                  <input
                    type="password"
                    placeholder="currentPassword"
                    className="bg-gray-100 w-full text-sm mt-4 mr-5  text-gray-800 px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
                    value={formData.currentPassword}
                    name="currentPassword"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-wrap gap-5 justify-end">
                  <div>
                    <button
                      type="submit"
                      className="w-full py-4 px-8 text-sm tracking-wide font-semibold text-white bg-orange-500 hover:bg-orange-300 hover:text-black rounded-full"
                    >
                      Save
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="w-full py-4 px-8 text-sm tracking-wide font-semibold text-white bg-orange-500 hover:bg-orange-300 hover:text-black rounded-full"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    );
        
  
};

export default Profileedit;