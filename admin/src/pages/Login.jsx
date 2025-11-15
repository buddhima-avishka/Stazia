import React, { useState,useContext } from "react";
import assets from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {

  const [state, setState] = useState('Admin');

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {setAToken,backendUrl} = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    
    event.preventDefault()

    try {
      
      if (state === 'Admin') {
        
        const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          
        } else {
          toast.error(data.message)
        }

      } else {

      }

    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p><span>{state}</span> Login</p>
        <div>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border min-w-[340px] sm:min-w-96' type="email" required/>
        </div>
        <div>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border min-w-[340px] sm:min-w-96' type="password" required/>
        </div>
        <button className='border'>Login</button>
        {
          state === 'Admin'
          ? <p>Doctor Login? <span onClick={()=>setState('Doctor')}>Click here</span></p>
          : <p>Admin Login? <span onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login