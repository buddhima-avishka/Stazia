import React from 'react'
import MyBookingsHeader from '../components/MyBookingsHeader'
import { assets, stays } from '../assets/assets'

function MyBookings() {
  // Example bookings data using stays from assets.js
  const [bookings, setBookings] = React.useState([
    {
      id: 1,
      stay: stays[0],
      checkIn: '2025-10-25',
      checkOut: '2025-10-28',
      guests: 2,
      totalAmount: 18000,
      isPaid: true,
    },
    {
      id: 2,
      stay: stays[1],
      checkIn: '2025-11-01',
      checkOut: '2025-11-03',
      guests: 1,
      totalAmount: 8000,
      isPaid: false,
    },
    {
      id: 3,
      stay: stays[3],
      checkIn: '2025-11-10',
      checkOut: '2025-11-15',
      guests: 4,
      totalAmount: 65000,
      isPaid: true,
    },
  ])

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== bookingId))
    }
  }

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
          {bookings.map((booking, index) => (
            <div key={booking.id}>
              <div className="flex flex-col lg:flex-row hover:bg-gray-50 transition-colors">
                {/* Left Side - Image and Stay Details */}
                <div className="lg:w-2/5 p-6 flex gap-4">
                  <img 
                    src={booking.stay.image} 
                    alt={booking.stay.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-900">{booking.stay.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{booking.stay.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={assets.homeIcon} alt="room" className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{booking.stay.roomType}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Guests:</span> {booking.guests}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-primary mt-3">
                      Total: LKR {booking.totalAmount.toLocaleString()}
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
                        <p className="text-sm font-medium text-gray-900">{booking.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={assets.calenderIcon} alt="calendar" className="w-5 h-5" />
                      <div>
                        <p className="text-xs text-gray-600">Check-out</p>
                        <p className="text-sm font-medium text-gray-900">{booking.checkOut}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Payment */}
                <div className="lg:w-1/4 p-6 flex flex-col justify-center">
                  <div className="mt-4 space-y-2">
                    {booking.isPaid ? (
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
                    <button 
                      onClick={() => handleCancelBooking(booking.id)}
                      className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all w-full"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
              {index < bookings.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBookings