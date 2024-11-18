import React from 'react';
import Navbar from '../Components/Navbar';

const About = () => {
    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-6 bg-gray-50 text-gray-800 mt-8">
            <h1 className="text-4xl font-bold ">About Us</h1> 
            <h5 className='text-2xl mt-8 ml-12'> Welcome to <span className='text-orange-500'>IndianSpicesRecipes</span>, your ultimate cooking companion!</h5>

            <p className="text-lg mt-4 ml-12">At <span className='text-orange-500'>IndianSpicesRecipes</span>, we believe that cooking should be fun, easy, and accessible to everyone. Whether you're a seasoned chef or a beginner in the kitchen, our goal is to help you create delicious meals with ease and confidence.
             We provide a wide range of recipes, from quick weeknight dinners to extravagant weekend feasts, all designed to inspire and satisfy your taste buds.
             </p>

             <h1 className="text-4xl font-bold mt-8 ">Our Mission</h1> 
             <h5 className='text-2xl mt-8 ml-12'> We are here to simplify your cooking experience by offering:</h5>
             <ul className='text-2xl mt-8 ml-12'>
                <li>
                <p><span className='font-bold'>A diverse collection of recipes:</span> From appetizers to desserts, we’ve got something for everyone,
                 no matter your dietary preferences or restrictions.</p>
                </li>
                <li className='mt-4'>
                <p><span className='font-bold'>Easy-to-follow instructions:</span> Each recipe is designed with step-by-step guidance to make cooking stress-free and enjoyable.</p>
                </li>
                <li className='mt-4'>
                <p><span className='font-bold'>Meal planning tools:</span> Plan your meals for the week, save your favorite recipes, and create shopping lists to streamline your cooking routine.</p>
                </li>
                <li className='mt-4'>
                <p><span className='font-bold'>Inspiration:</span> We aim to spark creativity in the kitchen and encourage you to try new flavors and techniques.</p>
                </li>
             </ul>

             <h1 className="text-4xl font-bold mt-8 ">Our Team</h1> 

             <p className="text-lg mt-4 ml-12">The<span className='text-orange-500'>IndianSpicesRecipes</span>,team consists of passionate foodies, home cooks, and professional chefs who are committed to making cooking easier and more enjoyable for you. 
             We’re constantly updating our recipe collection, adding new features, and gathering feedback to improve your experience.
             </p>

             <h1 className="text-4xl font-bold mt-8 ">Join Our Community</h1> 
             <p className="text-lg mt-4 ml-12">At IndianSpicesRecipes, we love hearing from our users. Share your favorite recipes, tips, and tricks, and don’t forget to follow us on social media for even more culinary inspiration!

</p>









            </div>
            
        
        </div>
    );
};

export default About;