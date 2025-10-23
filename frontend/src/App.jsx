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
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MyProfile from './pages/MyProfile'
import MyBookings from './pages/MyBookings'
 
function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/MyBookings' element={<MyBookings />} />
        <Route path='/stays' element={<Stays />} />
        <Route path='/stays/:property' element={<Stays />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/MyProfile' element={<MyProfile />} />
        <Route path='/MakeBookings/:_id' element={<MakeBookings />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
