import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]); // FIXED: define doctors
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):false ); // FIXED
  const [userData, setUserData] = useState(false);
   const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl+'/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors); // ✅ Use API's doctor list
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("getDoctorsData error:", error);
      toast.error("Something went wrong while fetching doctors");
    }
  };

//   const loadUserProfileData = async () => {
//     try {
//       console.log("Fetching user profile...");
//       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//  console.log("Profile response:", data);
//     if (data.success) {
//       const fullImageUrl = data.userData.image
//         ? `${backendUrl}/uploads/${data.userData.image}?t=${Date.now()}`
//         : null;

//       setUserData({
//         ...data.userData,
//         image: fullImageUrl,
//       });
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     console.error("Profile fetch failed:", error);
//     toast.error(error.response?.data?.message || "Failed to load profile");
//     }
//   };

 const loadUserProfileData = async () => {
  try {
    console.log("Fetching user profile...");
    const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile response:", data);

    if (data.success) {
      // const fullImageUrl = data.userData.image
      //   ? `${backendUrl}/uploads/${data.userData.image}?t=${Date.now()}`
      //   : null;
      const fullImageUrl = data.userData.image?.startsWith("http")
  ? `${data.userData.image}?t=${Date.now()}`
  : `${backendUrl}/uploads/${data.userData.image}?t=${Date.now()}`;


      const updatedUser = {
        ...data.userData,
        image: fullImageUrl,
      };

      setUserData(updatedUser);
      return updatedUser; // ✅ return the updated user data
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Profile fetch failed:", error);
    toast.error(error.response?.data?.message || "Failed to load profile");
  }
};


  const value = {
    doctors,getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };
useEffect(()=>{
  getDoctorsData()
},[])


   useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
