import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const RelatedDoctors = ({speciality,docId}) => {
    const {doctors} =useContext(AppContext)
    const  navigate=useNavigate()
    const [relDoc,setRelDocs]=useState([])
    useEffect(()=>{
      if(doctors.length>0 && speciality) {
        const doctorsData = doctors.filter((doc)=>doc.speciality===speciality && doc._id!==docId)
      setRelDocs(doctorsData);
    } 
    },[doctors,speciality,docId]);
  return (
   <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* ✅ Responsive Grid Layout */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-sm"
          >
            {/* ✅ Image Alignment */}
            <div className="bg-blue-50 flex justify-center items-center h-40">
              <img
                src={item.image}
                alt={item.name}
                className="h-full object-contain"
              />
            </div>

            <div className="p-4 space-y-1 text-sm">
              {/* <div className="flex items-center gap-2 text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>Available</p> */}
                 <div className={`flex items-center gap-2 ${item.available ?'text-green-500':'text-gray-500'}  `}>
               <div className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></div>

                <p>{item.available ?'Available':'Not Available'}</p>
              
              </div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-blue-600 hover:underline cursor-pointer text-sm"
  onClick={() => {
    navigate(`/doctors/${item.speciality}`);
    scrollTo(0, 0);
  }}
> {item.speciality}
</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Styled Button */}
      <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}}className="mt-6 px-6 py-2 bg-blue-200 text-white rounded-full hover:bg-blue-600 transition">
        More
      </button>
    </div>
  )
}

export default RelatedDoctors