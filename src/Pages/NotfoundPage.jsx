import React from 'react';

const NotfoundPage = () => {
    return (

        <div>
           <div className=' container mx-auto flex mt-12 justify-center'>
           <h1 className='text-4xl font-bold'>404 Not Found</h1>
           
           </div>
           <div className='mt-5 container mx-auto flex justify-center mb-5'>
           <Link to='/'><button className='bg-orange-500 text-white px-4 py-2 rounded'>Home</button></Link>
           
           </div>
          
           
        </div>
        
    );
};

export default NotfoundPage;