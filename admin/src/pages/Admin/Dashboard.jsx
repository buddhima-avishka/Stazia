import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Dashboard() {
  const { aToken, backendUrl, cancelAppointment } = useContext(AppContext)
  const [dashData, setDashData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(null)

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {
        headers: { aToken }
      })

      if (data.success) {
        setDashData(data.data)
        console.log('Dashboard Data:', data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (aToken) {
      getDashboardData()
    }
  }, [aToken])

  // Handle cancel confirmation
  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId)
    setShowCancelModal(true)
  }

  const confirmCancel = async () => {
    if (selectedBookingId) {
      await cancelAppointment(selectedBookingId)
      setShowCancelModal(false)
      setSelectedBookingId(null)
      // Refresh dashboard data to show updated booking status
      getDashboardData()
    }
  }

  const cancelModal = () => {
    setShowCancelModal(false)
    setSelectedBookingId(null)
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

  if (!dashData) {
    return (
      <div className='w-full max-w-7xl m-5'>
        <p className='text-gray-500'>No data available</p>
      </div>
    )
  }

  return (
    <div className='w-full max-w-7xl m-5'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-semibold'>Dashboard</h1>
        <button
          onClick={getDashboardData}
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
          </svg>
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {/* Total Rooms Card */}
        <div className='bg-white rounded-xl shadow-md p-6 border-t-4 transform hover:scale-105 transition-transform' style={{borderColor: '#C49C74'}}>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium mb-1'>Total Rooms</p>
              <h3 className='text-4xl font-bold' style={{color: '#C49C74'}}>{dashData.roomsCount}</h3>
            </div>
            <div className='p-4 rounded-full' style={{backgroundColor: '#FFF8F3'}}>
              <svg className='w-8 h-8' fill='none' stroke='#C49C74' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className='bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500 transform hover:scale-105 transition-transform' style={{borderColor: '#C49C74'}}>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium mb-1'>Total Bookings</p>
              <h3 className='text-4xl font-bold' style={{color: '#C49C74'}}>{dashData.bookingsCount}</h3>
            </div>
            <div className='p-4 rounded-full' style={{backgroundColor: '#FFF8F3'}}>
              <svg className='w-8 h-8' fill='none' stroke='#C49C74' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className='bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-500 transform hover:scale-105 transition-transform' style={{borderColor: '#C49C74'}}>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium mb-1'>Total Customers</p>
              <h3 className='text-4xl font-bold' style={{color: '#C49C74'}}>{dashData.customersCount}</h3>
            </div>
            <div className='p-4 rounded-full' style={{backgroundColor: '#FFF8F3'}}>
              <svg className='w-8 h-8' fill='none' stroke='#C49C74' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className='bg-white rounded-xl shadow-md p-6 border-t-4 border-amber-500 transform hover:scale-105 transition-transform' style={{borderColor: '#C49C74'}}>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium mb-1'>Total Revenue</p>
              <h3 className='text-3xl font-bold' style={{color: '#C49C74'}}>LKR {dashData.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className='p-4 rounded-full' style={{backgroundColor: '#FFF8F3'}}>
              <svg className='w-8 h-8' fill='none' stroke='#C49C74' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold text-gray-900'>Latest Bookings</h2>
          <span className='text-sm text-gray-500'>{dashData.latestBookings.length} recent bookings</span>
        </div>

        {dashData.latestBookings.length === 0 ? (
          <div className='text-center py-12'>
            <svg className='w-16 h-16 mx-auto text-gray-300 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
            </svg>
            <p className='text-gray-500'>No bookings yet</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {dashData.latestBookings.map((booking, index) => (
              <div 
                key={booking._id} 
                className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200'
              >
                {/* Number */}
                <div className='flex-shrink-0 w-8 h-8 bg-primary text-black rounded-full flex items-center justify-center font-semibold'>
                  {index + 1}
                </div>

                {/* Hotel Image */}
                <img 
                  src={booking.hotelData.image} 
                  alt={booking.hotelData.name}
                  className='w-16 h-16 rounded-lg object-cover flex-shrink-0'
                />

                {/* Booking Details */}
                <div className='flex-grow'>
                  <div className='flex items-start justify-between'>
                    <div>
                      <h4 className='font-semibold text-gray-900'>{booking.hotelData.name}</h4>
                      <p className='text-sm text-gray-600'>{booking.userData.name}</p>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-primary text-lg'>LKR {booking.totalPrice.toLocaleString()}</p>
                      <p className='text-xs text-gray-500'>{booking.numberOfNights} night(s)</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                    <span className='flex items-center gap-1'>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                      </svg>
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </span>
                    <span>→</span>
                    <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                    <span className='ml-auto'>
                      {booking.cancelled ? (
                        <span className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium'>
                          Cancelled
                        </span>
                      ) : booking.payment ? (
                        <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'>
                          Paid
                        </span>
                      ) : (
                        <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium'>
                          Unpaid
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Cancel Icon */}
                {!booking.cancelled && (
                  <button
                    onClick={() => handleCancelClick(booking._id)}
                    className='flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors'
                    title='Cancel Booking'
                  >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm mb-1'>Paid Bookings</p>
              <p className='text-2xl font-bold text-gray-900'>
                {dashData.latestBookings.filter(b => b.payment && !b.cancelled).length}
              </p>
            </div>
            <div className='text-green-500'>
              <svg className='w-10 h-10' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm mb-1'>Unpaid Bookings</p>
              <p className='text-2xl font-bold text-gray-900'>
                {dashData.latestBookings.filter(b => !b.payment && !b.cancelled).length}
              </p>
            </div>
            <div className='text-red-500'>
              <svg className='w-10 h-10' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm mb-1'>Cancelled Bookings</p>
              <p className='text-2xl font-bold text-gray-900'>
                {dashData.latestBookings.filter(b => b.cancelled).length}
              </p>
            </div>
            <div className='text-gray-500'>
              <svg className='w-10 h-10' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn'>
          <div className='bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4'>
            <div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full'>
              <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-center text-gray-900 mb-2'>Cancel Booking?</h3>
            <p className='text-center text-gray-600 mb-6'>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={cancelModal}
                className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
              >
                No, Keep it
              </button>
              <button
                onClick={confirmCancel}
                className='flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium'
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard