import React, { useContext, useEffect, useState } from 'react'
import { HotelContext } from '../../context/HotelContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function HotelDashboard() {
  const { hToken, backendUrl } = useContext(HotelContext)
  const [hotelData, setHotelData] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalRevenue: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    pendingPayments: 0
  })

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

  // Get hotel profile and bookings data
  const getDashboardData = async () => {
    try {
      setLoading(true)

      if (!hToken) {
        toast.error('No authentication token found')
        setLoading(false)
        return
      }

      const decoded = decodeToken(hToken)

      if (!decoded || !decoded.id) {
        toast.error('Invalid authentication token')
        setLoading(false)
        return
      }

      const hotelId = decoded.id

      // Fetch hotel profile
      const profileResponse = await axios.post(
        backendUrl + '/api/hotel/profile',
        { hotelId },
        { headers: { hToken } }
      )

      if (profileResponse.data.success) {
        setHotelData(profileResponse.data.hotelData)
      }

      // Fetch bookings
      const bookingsResponse = await axios.post(
        backendUrl + '/api/hotel/bookings',
        { hotelId },
        { headers: { hToken } }
      )

      if (bookingsResponse.data.success) {
        const bookingsList = bookingsResponse.data.bookings
        setBookings(bookingsList)

        // Calculate statistics
        const today = new Date()
        let totalRevenue = 0
        let activeCount = 0
        let completedCount = 0
        let cancelledCount = 0
        let pendingPaymentCount = 0

        bookingsList.forEach(booking => {
          if (!booking.cancelled && booking.payment) {
            totalRevenue += booking.totalPrice
          }

          if (booking.cancelled) {
            cancelledCount++
          } else if (booking.isCompleted) {
            completedCount++
          } else if (!booking.payment) {
            pendingPaymentCount++
          }

          // Check if booking is active (currently in stay period)
          const checkIn = new Date(booking.checkInDate)
          const checkOut = new Date(booking.checkOutDate)
          if (today >= checkIn && today <= checkOut && !booking.cancelled) {
            activeCount++
          }
        })

        setStats({
          totalBookings: bookingsList.length,
          activeBookings: activeCount,
          totalRevenue,
          completedBookings: completedCount,
          cancelledBookings: cancelledCount,
          pendingPayments: pendingPaymentCount
        })
      }
    } catch (error) {
      console.log('Error loading dashboard:', error)
      toast.error(error.response?.data?.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hToken) {
      getDashboardData()
    }
  }, [hToken])

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  // Get recent bookings (last 5)
  const recentBookings = bookings.slice(0, 5)

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
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Dashboard</h1>
      </div>

      {/* Statistics Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
        {/* Total Bookings */}
        <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Total Bookings</p>
              <p className='text-3xl font-bold' style={{color: '#C49C74'}}>{stats.totalBookings}</p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{backgroundColor: '#C49C74'+'20'}}>
              <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                <path fillRule='evenodd' d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Active Bookings</p>
              <p className='text-3xl font-bold' style={{color: '#C49C74'}}>{stats.activeBookings}</p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{backgroundColor: '#C49C74'+'20'}}>
              <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Total Revenue</p>
              <p className='text-3xl font-bold' style={{color: '#C49C74'}}>
                LKR {stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{backgroundColor: '#C49C74'+'20'}}>
              <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed Bookings */}
        <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Completed</p>
              <p className='text-3xl font-bold' style={{color: '#C49C74'}}>{stats.completedBookings}</p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{backgroundColor: '#C49C74'+'20'}}>
              <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Pending Payments</p>
              <p className='text-3xl font-bold' style={{color: '#C49C74'}}>{stats.pendingPayments}</p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{backgroundColor: '#C49C74'+'20'}}>
              <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
        </div>

        {/* Cancelled Bookings */}
        <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Cancelled</p>
              <p className='text-3xl font-bold' style={{color: '#C49C74'}}>{stats.cancelledBookings}</p>
            </div>
            <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{backgroundColor: '#C49C74'+'20'}}>
              <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className='bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-gray-900'>Recent Bookings</h2>
            <button 
              onClick={() => window.location.href = '#/room-bookings'}
              className='text-sm font-medium hover:underline'
              style={{color: '#C49C74'}}
            >
              View All
            </button>
          </div>
        </div>
        <div className='divide-y divide-gray-200'>
          {recentBookings.length > 0 ? (
            recentBookings.map((booking) => {
              let userData
              try {
                userData = JSON.parse(booking.userData)
              } catch (error) {
                userData = {}
              }

              return (
                <div key={booking._id} className='p-6 hover:bg-gray-50 transition-colors'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 flex-1'>
                      <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                        <svg className='w-5 h-5' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                        </svg>
                      </div>
                      <div className='flex-1'>
                        <p className='font-semibold text-gray-900'>{userData.name || 'Guest'}</p>
                        <div className='flex items-center gap-4 mt-1'>
                          <span className='text-sm text-gray-500'>
                            {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                          </span>
                          <span className='text-sm text-gray-400'>•</span>
                          <span className='text-sm text-gray-500'>{booking.roomType}</span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-gray-900'>LKR {booking.totalPrice.toLocaleString()}</p>
                      <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                        booking.cancelled ? 'bg-red-100 text-red-700' :
                        booking.isCompleted ? 'bg-green-100 text-green-700' :
                        !booking.payment ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {booking.cancelled ? 'Cancelled' :
                         booking.isCompleted ? 'Completed' :
                         !booking.payment ? 'Pending Payment' : 'Confirmed'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='p-12 text-center'>
              <svg className='w-16 h-16 mx-auto mb-4 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
              <p className='text-gray-500'>No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelDashboard