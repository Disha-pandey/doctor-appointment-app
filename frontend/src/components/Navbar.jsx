import React, { useContext, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { assets } from "../prescripto_assets/assets/assets_frontend/assets"
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const {token,setToken,userData} =useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false);
  const logout =()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
 
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      {/* Logo */}
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt='logo' />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/' className='relative'>
          <li className='py-1'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className='relative'>
          <li className='py-1'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className='relative'>
          <li className='py-1'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className='relative'>
          <li className='py-1'>CONTACT</li>
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className='flex items-center gap-4'>

        {/* Authenticated User */}
        {token  && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt='profile' />
            <img className='w-2.5' src={assets.dropdown_icon} alt='dropdown' />

            {/* Dropdown */}
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-sky-500 text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create account
          </button>
        )}

        {/* Hamburger Menu Icon (Mobile) */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden'
          src={assets.menu_icon}
          alt='menu'
        />

        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed' : 'hidden'} w-full h-full md:hidden right-0 top-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="logo" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" />
          </div>
          <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium'>
            <NavLink to='/' onClick={() => setShowMenu(false)}>Home</NavLink>
            <NavLink to='/doctors' onClick={() => setShowMenu(false)}>All Doctors</NavLink>
            <NavLink to='/about' onClick={() => setShowMenu(false)}>About</NavLink>
            <NavLink to='/contact' onClick={() => setShowMenu(false)}>Contact</NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;


  