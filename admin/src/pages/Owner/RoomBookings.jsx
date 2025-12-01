import React, { useContext, useEffect, useState } from 'react'
import { HotelContext } from '../../context/HotelContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function RoomBookings() {
  const { hToken, backendUrl } = useContext(HotelContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // Decode JWT token manually
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      return JSON.parse(jsonPayload)
    } catch (error) {
      return null
    }
  }

  // Get hotel bookings
  const getBookings = async () => {
    try {
      setLoading(true)

      if (!hToken) {
        toast.error('No authentication token found')
        setLoading(false)
        return
      }

      // Decode token to get hotel ID
      const decoded = decodeToken(hToken)

      if (!decoded || !decoded.id) {
        toast.error('Invalid authentication token')
        setLoading(false)
        return
      }

      const hotelId = decoded.id

      const { data } = await axios.post(
        backendUrl + '/api/hotel/bookings',
        { hotelId },
        { headers: { hToken } }
      )

      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log('Error loading bookings:', error)
      toast.error(error.response?.data?.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hToken) {
      getBookings()
    }
  }, [hToken])

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  // Calculate booking status
  const getBookingStatus = (booking) => {
    if (booking.cancelled) return { text: 'Cancelled', color: 'red' }
    if (booking.isCompleted) return { text: 'Completed', color: 'green' }
    if (!booking.payment) return { text: 'Payment Pending', color: 'yellow' }
    
    const today = new Date()
    const checkIn = new Date(booking.checkInDate)
    const checkOut = new Date(booking.checkOutDate)
    
    if (today < checkIn) return { text: 'Upcoming', color: 'blue' }
    if (today >= checkIn && today <= checkOut) return { text: 'Active', color: 'green' }
    return { text: 'Past', color: 'gray' }
  }

  if (loading) {
    return (
      <div className='w-full max-w-7xl m-5'>
        <div className='flex justify-center items-center py-20'>
          <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-7xl m-5'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6'>
        <div>
          <h1 className='text-3xl font-semibold mb-2'>Room Bookings</h1>
        </div>
        <div className='flex items-center gap-3 mt-4 sm:mt-0'>
          <span className='px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700'>
            Total Bookings: {bookings.length}
          </span>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className='space-y-4'>
          {bookings.map((booking) => {
            const status = getBookingStatus(booking)
            let userData, hotelData
            
            try {
              userData = JSON.parse(booking.userData)
              hotelData = JSON.parse(booking.hotelData)
            } catch (error) {
              userData = {}
              hotelData = {}
            }

            return (
              <div key={booking._id} className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
                <div className='p-6'>
                  <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                    {/* Guest Info */}
                    <div className='flex-1'>
                      <div className='flex items-start gap-4'>
                        <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                          <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                          </svg>
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-lg font-semibold text-gray-900'>{userData.name || 'Guest'}</h3>
                          <p className='text-sm text-gray-500'>{userData.email || 'No email'}</p>
                          <div className='flex flex-wrap gap-2 mt-2'>
                            <span className='inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600'>
                              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                              </svg>
                              {booking.numberOfGuests} Guest{booking.numberOfGuests > 1 ? 's' : ''}
                            </span>
                            <span className='inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600'>
                              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                              </svg>
                              {booking.roomType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 text-sm'>
                        <div className='flex-1'>
                          <p className='text-gray-500 mb-1'>Check-in</p>
                          <p className='font-semibold text-gray-900'>{formatDate(booking.checkInDate)}</p>
                        </div>
                        <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                        <div className='flex-1'>
                          <p className='text-gray-500 mb-1'>Check-out</p>
                          <p className='font-semibold text-gray-900'>{formatDate(booking.checkOutDate)}</p>
                        </div>
                      </div>
                      <div className='mt-2 text-sm text-gray-600'>
                        <span className='font-medium'>{booking.numberOfNights}</span> night{booking.numberOfNights > 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Price & Status */}
                    <div className='flex-shrink-0 text-right'>
                      <div className='mb-3'>
                        <p className='text-sm text-gray-500 mb-1'>Total Amount</p>
                        <p className='text-2xl font-bold' style={{color: '#C49C74'}}>
                          LKR {booking.totalPrice.toLocaleString()}
                        </p>
                        <p className='text-xs text-gray-500'>
                          LKR {booking.pricePerNight.toLocaleString()}/night
                        </p>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        status.color === 'red' ? 'bg-red-100 text-red-700' :
                        status.color === 'green' ? 'bg-green-100 text-green-700' :
                        status.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        status.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {status.text}
                      </span>
                      {booking.payment && (
                        <div className='mt-2'>
                          <span className='inline-flex items-center gap-1 text-xs text-green-600'>
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                            </svg>
                            Paid
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Booking Date */}
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <p className='text-xs text-gray-500'>
                      Booked on {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='p-12 text-center'>
            <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center'>
              <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>No bookings yet</h3>
            <p className='text-gray-500'>Bookings for your property will appear here</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomBookings