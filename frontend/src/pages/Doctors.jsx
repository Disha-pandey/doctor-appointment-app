import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (!Array.isArray(doctors)) return; // Prevents
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xl font-semibold mb-4">
        Browse through the doctors specialist.
      </p>

      {/* Filter Button for Small Screens */}
      <button
        className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
          showFilter ? 'bg-blue-400 text-white' : ''
        }`}
        onClick={() => setShowFilter(prev => !prev)}
      >
        Filters
      </button>

      {/* Filter Options for Small Screens (Only visible when showFilter is true) */}
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-6 sm:hidden mt-4">
          {specialities.map((spec, idx) => (
            <span
              key={idx}
              onClick={() => {
                navigate(`/doctors/${spec}`);
                setShowFilter(false);
              }}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer transition border ${
                speciality === spec
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-300'
              }`}
            >
              {spec}
            </span>
          ))}
        </div>
      )}

      {/* Filter Options for Larger Screens (Always visible) */}
      <div className="flex-wrap gap-2 mb-6 hidden sm:flex">
        {specialities.map((spec, idx) => (
          <span
            key={idx}
            onClick={() => navigate(`/doctors/${spec}`)}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer transition border ${
              speciality === spec
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-300'
            }`}
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-sm"
          >
            <div className="bg-blue-50 flex justify-center items-center h-40">
              <img
                src={item.image}
                alt={item.name}
                className="h-full object-contain"
              />
            </div>

            <div className="p-4 space-y-1 text-sm">
             <div className={`flex items-center gap-2 ${item.available ?'text-green-500':'text-gray-500'}  `}>
                <div className={`w-2 h-2 ${item.available ? ' bg-green-500 ':'bg-gray-500'} rounded-full`}></div>
                <p>{item.available ?'Available':'Not Available'}</p>
              </div>
            <p className="font-medium text-gray-800">{item.name}</p>

              <p className="text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
