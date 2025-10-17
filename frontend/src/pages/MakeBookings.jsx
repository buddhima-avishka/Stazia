import React, { useEffect, useState } from 'react'
import MakeBookingsHeader from '../components/MakeBookingsHeader'
import { useParams } from 'react-router-dom'
import { stays, facilityIcons, roomCommonData, assets } from '../assets/assets'

function MakeBookings() {

  const {_id} = useParams()
  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    const foundRoom = stays.find(room => room._id === _id)
    if (foundRoom) {
      setRoom(foundRoom)
      setMainImage(foundRoom.image)
    }
  }, [_id])

  return (
    <div>
      {/* <MakeBookingsHeader/> */}

      {/* Room Details */}
      {room && typeof room === 'object' ? (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-10'>

          {/* Main Image */}
          <div className='mb-8'>
            <img 
              src={mainImage} 
              alt={room.name} 
              className='w-full h-[400px] md:h-[500px] object-cover rounded-lg'
            />
          </div>
          
          {/* Title and Price */}
          <div className='mb-6'>
            <div className='flex items-center justify-between mb-2 flex-wrap gap-4'>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>{room.name}</h1>
                <div className='flex items-end gap-2'>
                  <span className='text-4xl font-bold text-primary'>Rs. {room.pricePerNight}</span>
                  <span className='text-gray-600 mb-1'>/ night</span>
                </div>              
            </div>
            <div className='flex items-center gap-4 text-gray-600 flex-wrap'>
              <span className='flex items-center gap-1'>
                <img src={assets.locationIcon} alt="location" className='w-4 h-4' />
                <span>{room.location}</span>
              </span>
              <span className='text-gray-400'>•</span>
              <span>{room.property}</span>
              <span className='text-gray-400'>•</span>
              <span>{room.roomType}</span>
            </div>
          </div>

          <div className='flex items-center gap-3 mb-6'>
            <div className='flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg'>
              <img src={assets.starIconFilled} alt="star" className='w-5 h-5' />
              <span className='text-xl font-semibold text-primary'>{room.rating}</span>
            </div>
            {room.isAvailable ? (
              <span className='bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold'>Available</span>
            ) : (
              <span className='bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold'>Booked</span>
            )}
          </div>

          {/* About Section */}
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Overview</h2>
            <p className='text-gray-600 leading-relaxed'>{room.about}</p>
          </div>

          {/* Amenities Section */}
          {room.amenities && room.amenities.length > 0 && (
            <div className='mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Amenities</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {room.amenities.map((amenity, index) => (
                  <div key={index} className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                    {facilityIcons[amenity] && (
                      <img src={facilityIcons[amenity]} alt={amenity} className='w-6 h-6' />
                    )}
                    <span className='text-gray-700 font-medium'>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Room Common Features */}
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Why guests love this place</h2>
            <div className='flex flex-col gap-4'>
              {roomCommonData.map((item, index) => (
                <div key={index} className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                  <img src={item.icon} alt={item.title} className='w-8 h-8 mt-1' />
                  <div>
                    <p className='font-semibold text-gray-800 mb-1'>{item.title}</p>
                    <p className='text-gray-600 text-sm'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Button */}
          <div className='mt-8'>
            <button 
              disabled={!room.isAvailable}
              className={`w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                room.isAvailable 
                  ? 'bg-primary text-white hover:scale-105 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {room.isAvailable ? `Book Now - Rs. ${room.pricePerNight}` : 'Currently Unavailable'}
            </button>
          </div>

          {/* Location Section */}
          <div className='mb-8 mt-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Location</h2>
            <p className='text-gray-600 leading-relaxed'>{room.location}</p>
          </div>
        </div>
      ) : (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-10'>
          <p className='text-center text-gray-600'>Loading room details...</p>
        </div>
      )}
    </div>
  )
}

export default MakeBookings
