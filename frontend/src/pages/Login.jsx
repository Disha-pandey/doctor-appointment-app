import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => { 
  const {backendUrl,token,setToken} = useContext(AppContext)
  const navigate =useNavigate()
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
      if (data.success) {
        localStorage.setItem('token', data.token); // ✅ fixed
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', { password, email });
      if (data.success) {
        localStorage.setItem('token', data.token); // ✅ fixed
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    console.log("Register/Login error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || error.message);
  }
};

 
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <p className="text-xl font-semibold text-gray-800 mb-2">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>

        {state === 'Sign Up' && (
          <div className="mb-4">
            <p className="text-sm mb-1">Full Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm mb-1">Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm mb-1">Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Login here' : 'Sign up'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
