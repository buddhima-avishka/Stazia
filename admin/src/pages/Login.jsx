import React, { useState,useContext } from "react";
import assets from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from "react-toastify";
import { HotelContext } from "../context/HotelContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [state, setState] = useState('Admin');

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {setAToken,backendUrl} = useContext(AdminContext);
  const {setHToken} = useContext(HotelContext)
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    
    event.preventDefault()

    try {
      
      if (state === 'Admin') {
        
        const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin login successful!');
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message)
        }

      } else {
        // Hotel Login
        const {data} = await axios.post(backendUrl + '/api/hotel/login', {email,password})
        if (data.success) {
          localStorage.setItem('hToken', data.token);
          setHToken(data.token)
          toast.success('Hotel login successful!');
          navigate('/hotel-dashboard');
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Login failed. Please try again.');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4'>
      <div className='flex flex-col gap-5 m-auto items-start p-10 min-w-[340px] sm:min-w-[420px] bg-white border border-gray-200 rounded-2xl text-gray-700 shadow-2xl'>
        
        {/* Header */}
        <div className='w-full text-center mb-4'>
          <p className='text-3xl font-bold text-gray-800 mb-2'>
            <span style={{color: '#C49C74'}}>{state}</span> Login
          </p>
          <p className='text-sm text-gray-500'>Welcome back! Please login to your account</p>
        </div>

        {/* Email Input */}
        <div className='w-full'>
          <p className='text-sm font-semibold text-gray-700 mb-2'>Email Address</p>
          <input 
            onChange={(e)=>setEmail(e.target.value)} 
            value={email} 
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all' 
            style={{focusRingColor: '#C49C74'}}
            type="email" 
            placeholder='admin@stayzia.com'
            required
          />
        </div>

        {/* Password Input */}
        <div className='w-full'>
          <p className='text-sm font-semibold text-gray-700 mb-2'>Password</p>
          <input 
            onChange={(e)=>setPassword(e.target.value)} 
            value={password} 
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all' 
            style={{focusRingColor: '#C49C74'}}
            type="password" 
            placeholder='Enter your password'
            required
          />
        </div>

        {/* Login Button */}
        <button 
          className='w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg mt-2' 
          style={{backgroundColor: '#C49C74'}}
        >
          Login
        </button>

        {/* Switch Login Type */}
        <div className='w-full text-center mt-2'>
          {
            state === 'Admin'
            ? <p className='text-sm text-gray-600'>Hotel Login? <span onClick={()=>setState('Hotel')} className='font-semibold cursor-pointer hover:underline transition-all' style={{color: '#C49C74'}}>Click here</span></p>
            : <p className='text-sm text-gray-600'>Admin Login? <span onClick={()=>setState('Admin')} className='font-semibold cursor-pointer hover:underline transition-all' style={{color: '#C49C74'}}>Click here</span></p>
          }
        </div>
      </div>
    </form>
  )
}

export default Login