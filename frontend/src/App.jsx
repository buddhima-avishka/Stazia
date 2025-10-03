import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import BookingRequests from './pages/BookingRequests'
import Stays from './pages/Stays'
import Login from './pages/Login'
import HotelProfile from './pages/HotelProfile'
import MakeBookings from './pages/MakeBookings'

function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/booking-requests' element={<BookingRequests />} />
        <Route path='/stays' element={<Stays />} />
        <Route path='/stays/:speciality' element={<Stays />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/HotelProfile' element={<HotelProfile />} />
        <Route path='/MakeBookings/:docId' element={<MakeBookings />} />
      </Routes>
    </div>
  )
}

export default App
