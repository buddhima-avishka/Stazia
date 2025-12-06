import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import assets from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { HotelContext } from '../context/HotelContext'

function Sidebar() {

  const {aToken} = useContext(AdminContext)
  const {hToken} = useContext(HotelContext)

  return (
    <div className='h-screen sticky top-0 bg-white border-r overflow-y-auto' style={{borderColor: '#C49C74'}}>
      {
        aToken && <ul className='text-[#515151] mt-5 '>

        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF8F3] border-r-4 ' : ''}`} to={'/admin-dashboard'} style={({isActive}) => isActive ? {borderColor: '#C49C74'} : {}}>
          <img src={assets.home_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF8F3] border-r-4 ' : ''}`} to={'/all-bookings'} style={({isActive}) => isActive ? {borderColor: '#C49C74'} : {}}>
          <img src={assets.booking_icon} alt="" />
          <p>All Bookings</p>
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF8F3] border-r-4 ' : ''}`} to={'/add-room'} style={({isActive}) => isActive ? {borderColor: '#C49C74'} : {}}>
          <img src={assets.add_icon} alt="" />
          <p>Add Room</p>
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF8F3] border-r-4 ' : ''}`} to={'/rooms-list'} style={({isActive}) => isActive ? {borderColor: '#C49C74'} : {}}>
          <img src={assets.check_list} alt="" className='w-6 h-6' />
          <p>List Room</p>
        </NavLink>
      </ul>
      }

      {
        hToken && <ul className='text-[#515151] mt-5 '>

        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF8F3] border-r-4 ' : ''}`} to={'/hotel-dashboard'} style={({isActive}) => isActive ? {borderColor: '#C49C74'} : {}}>
          <img src={assets.home_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF8F3] border-r-4 ' : ''}`} to={'/room-bookings'} style={({isActive}) => isActive ? {borderColor: '#C49C74'} : {}}>
          <img src={assets.booking_icon} alt="" />
          <p>Bookings</p>
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF8F3] border-r-4 ' : ''}`} to={'/hotel-profile'} style={({isActive}) => isActive ? {borderColor: '#C49C74'} : {}}>
          <img src={assets.traveller_icon} alt="" />
          <p>Profile</p>
        </NavLink>
      </ul>
      }

    </div>
  )
}

export default Sidebar