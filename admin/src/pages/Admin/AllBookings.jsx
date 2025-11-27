import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

function AllBookings() {
  const { aToken, bookings, getAllBookings, cancelAppointment } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(null)

  // Fetch all bookings
  const fetchAllBookings = async () => {
    try {
      setLoading(true)
      await getAllBookings()
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Show cancel confirmation modal
  const showCancelConfirmation = (bookingId) => {
    setSelectedBookingId(bookingId)
    setShowCancelModal(true)
  }

  // Handle cancel booking
  const handleCancelBooking = async () => {
    if (selectedBookingId) {
      await cancelAppointment(selectedBookingId)
      setShowCancelModal(false)
      setSelectedBookingId(null)
    }
  }

  // Close modal
  const closeModal = () => {
    setShowCancelModal(false)
    setSelectedBookingId(null)
  }

  useEffect(() => {
    if (aToken) {
      fetchAllBookings()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-7xl m-5'>
      <h1 className='text-3xl font-semibold mb-6'>All Bookings</h1>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fade-in'>
            <div className='flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4'>
              <svg className='w-6 h-6 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 text-center mb-2'>Cancel Appointment</h3>
            <p className='text-gray-600 text-center mb-6'>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={closeModal}
                className='flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium'
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelBooking}
                className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium'
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className='flex justify-center items-center py-20'>
          <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg'>
          <p className='text-gray-500 text-xl mb-2'>No bookings found</p>
          <p className='text-gray-400 text-sm'>Bookings will appear here when customers make reservations</p>
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {/* Table Header */}
          <div className='hidden lg:grid grid-cols-[0.5fr_1fr_2fr_1.5fr_1fr_1fr_0.5fr] gap-4 p-4 bg-gray-100 font-semibold text-sm'>
            <p>#</p>
            <p>Customer</p>
            <p>Hotel Details</p>
            <p>Dates & Guests</p>
            <p>Amount</p>
            <p>Status</p>
            <p>Action</p>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-gray-200'>
            {bookings.map((booking, index) => (
              <div 
                key={booking._id} 
                className='grid grid-cols-1 lg:grid-cols-[0.5fr_1fr_2fr_1.5fr_1fr_1fr_0.5fr] gap-4 p-4 hover:bg-gray-50 transition-colors'
              >
                {/* Number */}
                <div className='flex items-center'>
                  <p className='font-semibold text-gray-600 text-lg'>{index + 1}</p>
                </div>

                {/* Customer Info */}
                <div className='flex flex-col justify-center'>
                  <p className='font-medium text-gray-900'>{booking.userData.name}</p>
                  <p className='text-sm text-gray-500 truncate'>{booking.userData.email}</p>
                </div>

                {/* Hotel Details */}
                <div className='flex gap-3'>
                  <img 
                    src={booking.hotelData.image} 
                    alt={booking.hotelData.name}
                    className='w-20 h-20 object-cover rounded-lg'
                  />
                  <div className='flex flex-col justify-center'>
                    <p className='font-semibold text-gray-900'>{booking.hotelData.name}</p>
                    <p className='text-sm text-gray-600'>{booking.roomType}</p>
                    <p className='text-xs text-gray-500'>{booking.hotelData.location}</p>
                  </div>
                </div>

                {/* Dates & Guests */}
                <div className='flex flex-col justify-center'>
                  <div className='text-sm'>
                    <p className='text-gray-600'>
                      <span className='font-medium'>Check-in:</span> {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <p className='text-gray-600'>
                      <span className='font-medium'>Check-out:</span> {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className='text-gray-600 mt-1'>
                      <span className='font-medium'>Nights:</span> {booking.numberOfNights} | 
                      <span className='font-medium'> Guests:</span> {booking.numberOfGuests}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className='flex flex-col justify-center'>
                  <p className='text-lg font-bold text-primary'>
                    LKR {booking.totalPrice.toLocaleString()}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {booking.pricePerNight.toLocaleString()} per night
                  </p>
                </div>

                {/* Status */}
                <div className='flex flex-col justify-center gap-2'>
                  {booking.cancelled ? (
                    <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700'>
                      <span className='w-2 h-2 bg-gray-600 rounded-full'></span>
                      Cancelled
                    </span>
                  ) : booking.payment ? (
                    <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'>
                      <span className='w-2 h-2 bg-green-600 rounded-full'></span>
                      Paid
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'>
                      <span className='w-2 h-2 bg-red-600 rounded-full'></span>
                      Unpaid
                    </span>
                  )}
                  <p className='text-xs text-gray-500'>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className='flex items-center justify-center gap-2'>
                  {!booking.cancelled && (
                    <button 
                      onClick={() => showCancelConfirmation(booking._id)}
                      className='text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all'
                      title='Cancel Booking'
                    >
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  )}
                  {booking.cancelled && (
                    <span className='text-gray-400 text-sm'>Cancelled</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {!loading && bookings.length > 0 && (
        <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <p className='text-gray-600 text-sm'>Total Bookings</p>
            <p className='text-2xl font-bold text-gray-900'>{bookings.length}</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <p className='text-gray-600 text-sm'>Paid Bookings</p>
            <p className='text-2xl font-bold text-green-600'>
              {bookings.filter(b => b.payment && !b.cancelled).length}
            </p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <p className='text-gray-600 text-sm'>Unpaid Bookings</p>
            <p className='text-2xl font-bold text-red-600'>
              {bookings.filter(b => !b.payment && !b.cancelled).length}
            </p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <p className='text-gray-600 text-sm'>Total Revenue</p>
            <p className='text-2xl font-bold text-primary'>
              LKR {bookings
                .filter(b => b.payment && !b.cancelled)
                .reduce((sum, b) => sum + b.totalPrice, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllBookings