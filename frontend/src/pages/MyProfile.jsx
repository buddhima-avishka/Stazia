import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

function MyProfile() {

  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  React.useEffect(() => {
    // Trigger a small scroll to activate navbar background
    window.scrollTo(0, 1);
  }, []);

  return userData && (
    <div className='max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-24 sm:pt-28'>
      <div className='flex flex-col gap-2 text-sm mt-4 sm:mt-8'>

      {
        isEdit
        ? <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover opacity-75 border-4 border-gray-200' src={image ? URL.createObjectURL(image): userData.image} alt="" />
            <img className='w-8 h-8 sm:w-10 sm:h-10 absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white rounded-full p-1' src={image ? '': assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" accept='image/*' hidden/>
        </label>
        :<img className='w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-primary/20' src={userData.image} alt="" />
      }
      
      {
        isEdit
        ? <input className='bg-gray-50 text-2xl sm:text-3xl font-medium w-full max-w-xs mt-4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>
        : <p className='font-medium text-2xl sm:text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none my-4'/>

      <div className='bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100'>
        <p className='text-neutral-500 uppercase text-xs font-semibold tracking-wider mb-4'>Contact Information</p>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-3 sm:gap-y-4 text-neutral-700'>
          <p className='font-medium text-gray-600'>Email:</p>
          <p className='text-blue-600 break-all'>{userData.email}</p>
          
          <p className='font-medium text-gray-600'>Phone:</p>
          {
            isEdit
            ? <input className='bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:max-w-xs' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev, phone:e.target.value}))} placeholder='Enter phone number'/>
            : <p className='text-gray-700'>{userData.phone}</p>
          }
          
          <p className='font-medium text-gray-600'>Address:</p>
          {
            isEdit
            ? <div className='flex flex-col gap-2'>
              <input className='bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" placeholder='Address Line 1'/>
              <input className='bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text" placeholder='Address Line 2'/>
            </div>
            : <p className='text-gray-700'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
      </div>

      <div className='bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mt-6'>
        <p className='text-neutral-500 uppercase text-xs font-semibold tracking-wider mb-4'>Basic Information</p>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-3 sm:gap-y-4 text-neutral-700'>
          <p className='font-medium text-gray-600'>Gender:</p>
          {
            isEdit
            ? <select className='bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:max-w-xs' onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender}>
              <option value="Not Selected">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-700'>{userData.gender}</p>
          }
          
          <p className='font-medium text-gray-600'>Birthday:</p>
          {
            isEdit
            ? <input className='bg-gray-50 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:max-w-xs' type="date" onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob}/>
            : <p className='text-gray-700'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-8 mb-10 flex gap-3'>
        {
          isEdit
          ? <>
              <button className='flex-1 sm:flex-none border-2 border-primary bg-primary text-white px-6 sm:px-8 py-2.5 rounded-full hover:bg-primary/90 transition-all font-medium shadow-sm' onClick={updateUserProfileData}>Save Changes</button>
              <button className='flex-1 sm:flex-none border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-2.5 rounded-full hover:bg-gray-50 transition-all font-medium' onClick={() => {setIsEdit(false); setImage(false); loadUserProfileData();}}>Cancel</button>
            </>
          : <button className='w-full sm:w-auto border-2 border-primary text-primary px-8 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all font-medium shadow-sm' onClick={()=>setIsEdit(true)}>Edit Profile</button>
        }
      </div>
        
      </div>
    </div>
  )
}

export default MyProfile