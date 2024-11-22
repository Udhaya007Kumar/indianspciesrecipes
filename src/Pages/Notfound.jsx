import React from 'react';
 import Notfoundimg from '../assets/Notfound.jpg'

import { Link } from 'react-router-dom';
const Notfound = () => {


    return (
        <div>
           <div className=' container mx-auto flex mt-12 justify-center'>
           <img  src={Notfoundimg} alt="" />
           
           </div>
           <div className='mt-5 container mx-auto flex justify-center mb-5'>
           <Link to='/'><button className='bg-orange-500 text-white px-4 py-2 rounded'>Home</button></Link>
           
           </div>
          
           
        </div>
    );
};

export default Notfound;