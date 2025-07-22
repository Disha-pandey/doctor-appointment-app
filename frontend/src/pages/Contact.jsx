import React from 'react';
import { assets } from '../prescripto_assets/assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className='px-4 md:px-20 py-10'>
      {/* Title */}
      <div className='text-center text-2xl text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      {/* Content Section */}
      <div className='my-10 flex flex-col md:flex-row justify-between items-center gap-12'>
        {/* Left Image */}
        <img className='w-full md:max-w-md rounded-lg shadow' src={assets.contact_image} alt='Contact Us' />

        {/* Right Info */}
        <div className='flex flex-col gap-6 text-gray-700 text-sm md:w-2/4'>
          <div>
            <h3 className='font-semibold text-base mb-1'>OUR OFFICE</h3>
            <p>00000 Willms Station<br />Suite 000, Washington, USA</p>
            <p className='mt-2'>Tel: (000) 000-0000</p>
            <p>Email: <a href='mailto:health&care@gmail.com' className='text-blue-600 hover:underline'>health&care@gmail.com</a></p>
          </div>

          <div>
            <h3 className='font-semibold text-base mb-1'>CAREERS AT PRESCRIPTO</h3>
            <p>Learn more about our teams and job openings.</p>
          </div>

          {/* Button with hover effect */}
          <button className='w-fit border border-black px-6 py-2 rounded transition-all duration-300 hover:bg-blue-600 hover:text-white'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
