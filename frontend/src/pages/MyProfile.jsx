import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../prescripto_assets/assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [cacheBustedImage, setCacheBustedImage] = useState('');

  // Set cached image on initial load
  useEffect(() => {
    if (userData?.image) {
      setCacheBustedImage(`${userData.image}?${Date.now()}`);
    }
  }, [userData?.image]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        // await loadUserProfileData();
        // setCacheBustedImage(`${userData.image}?${Date.now()}`);
        const updated = await loadUserProfileData();
if (updated?.image) {
  setCacheBustedImage(updated.image);
}

        setImage(null);
        setIsEdit(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return userData && (
    <div>
      {/* Profile Header */}
      <div className="max-w-xl flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer inline-block">
            <img
              className="w-36 rounded opacity-75"
              src={
                image
                  ? URL.createObjectURL(image)
                  : cacheBustedImage || userData.image || assets.profile_pic
              }
              alt="Profile"
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={assets.upload_icon}
              alt=""
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 rounded"
            src={cacheBustedImage || userData.image || assets.profile_pic}
            alt="Profile"
          />
        )}

        <div className="w-full md:mt-4">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-xl md:text-2xl font-semibold border p-2 rounded w-full"
            />
          ) : (
            <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
              {userData.name}
            </h2>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="mt-8 space-y-6 text-sm sm:text-base">
        {/* Contact Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">
            CONTACT INFORMATION
          </h3>
          <div className="mt-2 space-y-3">
            <p>
              <strong>Email:</strong>{' '}
              <span className="text-blue-600">{userData.email}</span>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="border p-1 rounded w-full"
                />
              ) : (
                userData.phone
              )}
            </p>
            <p>
              <strong>Address:</strong>
              <br />
              {isEdit ? (
                <>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={userData.address?.line1 || ''}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                    className="border p-1 rounded w-full mt-1"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    value={userData.address?.line2 || ''}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                    className="border p-1 rounded w-full mt-1"
                  />
                </>
              ) : (
                <>
                  {userData.address?.line1 || '-'}
                  <br />
                  {userData.address?.line2 || ''}
                </>
              )}
            </p>
          </div>
        </section>

        {/* Basic Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">
            BASIC INFORMATION
          </h3>
          <div className="mt-2 space-y-3">
            <p>
              <strong>Gender:</strong>{' '}
              {isEdit ? (
                <select
                  value={userData.gender || 'Not Selected'}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  className="border p-1 rounded w-full"
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                userData.gender || 'Not Selected'
              )}
            </p>
            <p>
              <strong>Birthday:</strong>{' '}
              {isEdit ? (
                <input
                  type="date"
                  value={
                    userData.dob === 'Not Selected' ? '' : userData.dob
                  }
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                  className="border p-1 rounded w-full"
                />
              ) : (
                userData.dob || 'Not Selected'
              )}
            </p>
          </div>
        </section>

        {/* Save or Edit Button */}
        <div className="pt-4 text-center sm:text-left">
          <button
            onClick={() =>
              isEdit ? updateUserProfileData() : setIsEdit(true)
            }
            disabled={isEdit && !userData.name}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded disabled:opacity-50"
          >
            {isEdit ? 'Save Information' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
