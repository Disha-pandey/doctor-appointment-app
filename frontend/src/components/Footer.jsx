import React from 'react';
import { assets } from '../prescripto_assets/assets/assets_frontend/assets';

const Footer = () => {
  return (
    <div className="bg-white text-gray-700">
      {/* Top Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section - Logo & Description */}
        <div className="space-y-4">
          <img src={assets.logo} alt="Logo" className="h-10" />
          <p className="text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="space-y-4">
          <h3 className="text-black font-semibold text-lg">COMPANY</h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About us</li>
            <li className="hover:text-blue-600 cursor-pointer">Delivery</li>
            <li className="hover:text-blue-600 cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* Right Section - Contact */}
        <div className="space-y-4">
          <h3 className="text-black font-semibold text-lg">GET IN TOUCH</h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-blue-600">+0-000-000-000</li>
            <li className="hover:text-blue-600">health&care@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-500">
        <p>Copyright 2024 © health&care. - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
