import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import assets from '../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {

  const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r' style={{borderColor: '#C49C74'}}>
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
          <img src={assets.list_icon} alt="" />
          <p>List Room</p>
        </NavLink>
      </ul>
      }

    </div>
  )
}

export default Sidebar