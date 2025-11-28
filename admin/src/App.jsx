import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import { HotelContext } from './context/HotelContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddRoom from './pages/Admin/AddRoom';
import AllBookings from './pages/Admin/AllBookings';
import RoomsList from './pages/Admin/RoomsList';
import HotelDashboard from './pages/Owner/HotelDashboard';
import RoomBookings from './pages/Owner/RoomBookings';
import HotelProfile from './pages/Owner/HotelProfile';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { hToken } = useContext(HotelContext)

  return aToken || hToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/add-room' element={<AddRoom/>}/>
          <Route path='/all-bookings' element={<AllBookings/>}/>
          <Route path='/rooms-list' element={<RoomsList/>}/>

          {/* Hotel Route */}
          <Route path='/hotel-dashboard' element={<HotelDashboard/>}/>
          <Route path='/room-bookings' element={<RoomBookings/>}/>
          <Route path='/hotel-profile' element={<HotelProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App