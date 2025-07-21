import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddDoctors = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({line1: address1,line2: address2 }));

      // ✅ Debug: log FormData
      for (let [key, value] of formData.entries()) {
        console.log(`FORMDATA -> ${key}:`, value);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            atoken: aToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Optionally reset form:
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message || 'Failed to add doctor.');
      }
    } catch (error) {
      console.error('Add doctor error:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong while adding the doctor.');
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-auto text-gray-500'>
        {/* Upload */}
        <div className='flex items-center gap-4 mb-8'>
          <label htmlFor='doc-img'>
            <img
              className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt='Upload'
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type='file'
            id='doc-img'
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          {/* Column 1 */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p>Doctor name</p>
              <input
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input
                className='border rounded px-3 py-2'
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input
                className='border rounded px-3 py-2'
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Experience</p>
              <select
                className='border rounded px-3 py-2'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <p>Fees</p>
              <input
                className='border rounded px-3 py-2'
                type='number'
                placeholder='Fees'
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p>Speciality</p>
              <select
                className='border rounded px-3 py-2'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatricians'>Pediatricians</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <p>Education</p>
              <input
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Education'
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p>Address</p>
              <input
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Address 1'
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                className='border rounded px-3 py-2 mt-2'
                type='text'
                placeholder='Address 2'
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className='mt-6'>
          <p>About Doctor</p>
          <textarea
            className='border rounded px-3 py-2 w-full mt-1'
            placeholder='Write about doctor'
            rows={5}
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='bg-blue-500 text-white mt-6 px-5 py-2 rounded hover:bg-blue-600'
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctors;
