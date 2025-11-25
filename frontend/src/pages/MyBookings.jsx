import React, { useContext, useEffect } from 'react'
import MyBookingsHeader from '../components/MyBookingsHeader'
import { assets, stays } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyBookings() {

  const { backendUrl, token, getRoomsData } = useContext(AppContext)

  // Example bookings data using stays from assets.js
  const [bookings, setBookings] = React.useState([])

  const getUserBookings = async () => {
    try {

      const {data} = await axios.get(backendUrl + '/api/user/bookings',{headers:{token}})

      if (data.success) {
        setBookings(data.bookings)
        console.log(data.bookings);
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      
        const { data } = await axios.post(
          backendUrl + '/api/user/cancel-appointment',
          { bookingId },
          { headers: { token } }
        )

        if (data.success) {
          toast.success(data.message)
          getUserBookings() // Refresh bookings list
          getRoomsData()
        } else {
          toast.error(data.message)
        }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      getUserBookings()
    }
  },[token])

  return (
    <div className="min-h-screen">
      <MyBookingsHeader/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Column Headers */}
        <div className="hidden lg:block">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-4">
              <h3 className="text-lg font-bold text-gray-900">Hotels</h3>
            </div>
            <div className="lg:w-1/3 p-4">
              <h3 className="text-lg font-bold text-gray-900">Date & Timings</h3>
            </div>
            <div className="lg:w-1/4 p-4">
              <h3 className="text-lg font-bold text-gray-900">Payment</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-b-lg shadow-md">
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No bookings found</p>
              <p className="text-gray-400 text-sm mt-2">Your booking history will appear here</p>
            </div>
          ) : (
            bookings.map((booking, index) => {
              // Parse the hotel data from JSON string
              const hotelData = JSON.parse(booking.hotelData)
              
              return (
                <div key={booking._id}>
                  <div className="flex flex-col lg:flex-row hover:bg-gray-50 transition-colors">
                    {/* Left Side - Image and Stay Details */}
                    <div className="lg:w-2/5 p-6 flex gap-4">
                      <img 
                        src={hotelData.image} 
                        alt={hotelData.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-gray-900">{hotelData.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                          <p className="text-sm text-gray-600">{hotelData.location}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={assets.homeIcon} alt="room" className="w-4 h-4" />
                          <p className="text-sm text-gray-600">{booking.roomType}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Guests:</span> {booking.numberOfGuests}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-primary mt-3">
                          Total: LKR {booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Middle - Date & Timings */}
                    <div className="lg:w-1/3 p-6">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <img src={assets.calenderIcon} alt="calendar" className="w-5 h-5" />
                          <div>
                            <p className="text-xs text-gray-600">Check-in</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(booking.checkInDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={assets.calenderIcon} alt="calendar" className="w-5 h-5" />
                          <div>
                            <p className="text-xs text-gray-600">Check-out</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(booking.checkOutDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{booking.numberOfNights}</span> night(s)
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Payment */}
                    <div className="lg:w-1/4 p-6 flex flex-col justify-center">
                      <div className="mt-4 space-y-2">
                        {booking.cancelled ? (
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                            <span className="font-semibold">Cancelled</span>
                          </div>
                        ) : booking.payment ? (
                          <div className="flex items-center gap-2 text-green-600 mb-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="font-semibold">Paid</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-red-600">
                              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                              <span className="font-semibold">Unpaid</span>
                            </div>
                            <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all w-full">
                              Pay Now
                            </button>
                          </div>
                        )}
                        {!booking.cancelled && (
                          <button 
                            onClick={() => handleCancelBooking(booking._id)}
                            className="border border-red-500 text-red-500 px-8 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all w-full"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < bookings.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBookings