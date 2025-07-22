import React from 'react';
import { assets } from '../prescripto_assets/assets/assets_frontend/assets';

const About = () => {
  return (
    <div>
      {/* Header */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      {/* About Content */}
      <div className='my-10 flex flex-col md:flex-row gap-12 px-4 md:px-20'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-xl my-4 px-4 md:px-20 font-semibold'>
        <p>WHY <span className='text-gray-700'>CHOOSE US</span></p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-20 mb-20'>
        {/* Card 1 */}
        <div className='border p-6 rounded-lg shadow-sm transition-all duration-300 cursor-pointer hover:bg-blue-600 hover:text-white'>
          <p className='font-bold uppercase mb-2'>Efficiency:</p>
          <p className='text-sm'>
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>
        {/* Card 2 */}
        <div className='border p-6 rounded-lg shadow-sm transition-all duration-300 cursor-pointer hover:bg-blue-600 hover:text-white'>
          <p className='font-bold uppercase mb-2'>Convenience:</p>
          <p className='text-sm'>
            Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>
        {/* Card 3 */}
        <div className='border p-6 rounded-lg shadow-sm transition-all duration-300 cursor-pointer hover:bg-blue-600 hover:text-white'>
          <p className='font-bold uppercase mb-2'>Personalization:</p>
          <p className='text-sm'>
            Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
