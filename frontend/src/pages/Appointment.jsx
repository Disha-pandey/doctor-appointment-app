import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RelatedDoctors from '../components/RelatedDoctors';
import { AppContext } from '../context/AppContext';
import { assets } from '../prescripto_assets/assets/assets_frontend/assets';
import axios from 'axios';
import {toast} from 'react-toastify';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,token,getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
 const navigate=useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return;
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let day = currentDate.getDate()
      let month=currentDate.getMonth()+1
      let year=currentDate.getFullYear()
      const slotDate=day+"_"+month +"_"+year
      const slotTime=formattedTime
      const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false :true
       if(isSlotAvailable){
         timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
       }
     
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
 const bookAppointment =async () => {
  if(!token){
    toast.warn('Login to book appointment')
    return navigate('/login ')
  }
  try{
    const date =docSlots[slotIndex][0].datetime
    let day =date.getDate()
    let month = date.getMonth()+1
   let year = date.getFullYear() 
   const slotDate=day+"_"+month +"_"+year
 //  console.log(slotDate);
 const {data} =await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{Authorization: `Bearer ${token}`}})
 //  console.log(slotDate);
 if(data.success){
  toast.success(data.message)
  getDoctorsData()
  navigate('/my-appointments',{state:{refresh:true}})
 }
  else{
    toast.error(data.message)
  }
  }
  catch(error){
console.log(error)
toast.error(error.message)
  }
 }







  useEffect(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="container mx-auto px-4 py-6">
        {/* Doctor Info Card */}
        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-md border">
          {/* Image */}
          <div className="flex-shrink-0 bg-[#5b4fff1a] rounded-2xl w-full md:w-1/3 flex justify-center items-center p-4">
            <img
              src={docInfo.image || '/default-doctor.png'}
              alt={docInfo.name}
              className="w-full h-auto rounded-xl object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                 {docInfo.name}
                <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
              </h2>
              <p className="text-gray-600 mt-1">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mt-2">
                {docInfo.experience} Years
              </span>

              {/* About */}
              <div className="mt-6">
                <p className="flex items-center gap-1 font-medium text-gray-800 mb-1">
                  About <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{docInfo.about}</p>
              </div>

              {/* Fee */}
              <p className="mt-4 font-medium text-gray-800">
                Appointment fee: <span className="text-black">{currencySymbol}{docInfo.fees}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-10 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* Date Pills */}
          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-3 px-4 min-w-16 rounded-full cursor-pointer transition-all duration-200 
                    ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-800'}`}
                  key={index}
                >
                  {/* <p className="text-sm font-semibold">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-xs">
                    {item[0] && item[0].datetime.getDate()}
                  </p> */}
                  {(() => {
  const today = new Date();
  const slotDate = new Date(today.setDate(today.getDate() + index));
  const dayName = index === 0 ? "Today" : daysOfWeek[slotDate.getDay()];
  return (
    <>
      <p className="text-sm font-semibold">{dayName}</p>
      <p className="text-xs">{slotDate.getDate()}</p>
    </>
  );
})()}

                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm px-5 py-2 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 
                    ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-600 border border-gray-300'}`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <button onClick={bookAppointment} className="mt-6 bg-blue-600 text-white px-14 py-3 rounded-full hover:bg-blue-700 transition-all duration-200">
            Book an appointment
          </button>
        </div>
        {/*-- listing related doctors---- */}
        <RelatedDoctors docId={docInfo?._id} speciality={docInfo?.speciality}/>
      </div>
    )
  );
};

export default Appointment;
