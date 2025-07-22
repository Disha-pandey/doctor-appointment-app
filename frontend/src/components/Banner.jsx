import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../prescripto_assets/assets/assets_frontend/assets';

const Banner = () => {
  const navigate=useNavigate()
  return (
    <div className="w-full bg-blue-400 py-10 px-6 md:px-14 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      
      {/* Left Section */}
      <div className="flex flex-col gap-4 text-center md:text-left max-w-lg">
        <p className="text-3xl sm:text-4xl font-bold text-gray-800">
          Book Appointment
        </p>
        <p className="text-3xl sm:text-4xl  font-bold text-gray-800">
          With 100+ Trusted Doctors
        </p>

       <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className="bg-white text-sm sm:text-base text-gray-600 px-5 py-2 rounded-full mt-6 hover:scale-105 transition-all">
  Create account
</button>

      </div>

      {/* Right Section */}
      <div className="w-full max-w-sm">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
