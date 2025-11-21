import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function RoomsList() {
  const { backendUrl, aToken } = useContext(AdminContext)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(backendUrl + '/api/admin/all-rooms', {}, { headers: { aToken } })
      
      if (data.success) {
        setRooms(data.rooms)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error fetching rooms:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const changeAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/change-availability', 
        { roomId }, 
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchRooms() // Refresh the room list
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error changing availability:', error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (aToken) {
      fetchRooms()
    }
  }, [aToken])

  return (
    <div className='m-5 w-full'>
      <p className='mb-6 text-2xl font-semibold text-gray-800'>All Rooms</p>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2' style={{ borderColor: '#C49C74' }}></div>
        </div>
      ) : rooms.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-lg'>
          <p className='text-gray-500 text-lg mb-2'>No rooms found</p>
          <p className='text-gray-400 text-sm'>Add your first room to get started</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {rooms.map((room) => (
            <div
              key={room._id}
              className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]'
            >
              {/* Room Image */}
              <div className='relative h-48 overflow-hidden'>
                <img
                  src={room.image}
                  alt={room.name}
                  className='w-full h-full object-cover'
                />
                <div className='absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg' style={{ backgroundColor: '#C49C74' }}>
                  {room.roomType}
                </div>
              </div>

              {/* Room Details */}
              <div className='p-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2 line-clamp-1'>
                  {room.name}
                </h3>
                <p className='text-sm text-gray-600 mb-3'>
                  {room.property}
                </p>
                
                {/* <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <span className='text-yellow-500 text-sm'>★</span>
                    <span className='text-sm font-medium text-gray-700'>{room.rating}</span>
                  </div>
                  <p className='text-lg font-bold' style={{ color: '#C49C74' }}>
                    LKR {room.pricePerNight}
                  </p>
                </div> */}

                <div className='mt-3 pt-3 border-t border-gray-200'>
                  {/* <p className='text-xs text-gray-500 mb-2'>
                    📍 {room.location}
                  </p> */}
                  <div className='flex items-center gap-2'>
                    <input 
                      type="checkbox" 
                      checked={room.available}
                      onChange={() => changeAvailability(room._id)}
                      className='w-4 h-4 cursor-pointer'
                      style={{ accentColor: '#C49C74' }}
                    />
                    <p className='text-xs text-gray-600'>Available</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoomsList