import React, { useEffect, useState, useContext } from 'react'
import MakeBookingsHeader from '../components/MakeBookingsHeader'
import { useParams } from 'react-router-dom'
import { facilityIcons, roomCommonData, assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

function MakeBookings() {

  const {_id} = useParams()
  const {rooms} = useContext(AppContext)
  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [showBookNow, setShowBookNow] = useState(false)

  useEffect(() => {
    const foundRoom = rooms.find(room => room._id === _id)
    if (foundRoom) {
      setRoom(foundRoom)
      setMainImage(foundRoom.image)
    }
  }, [_id, rooms])

  // Gallery images - use roomImages from database if available, otherwise fallback to assets
  const galleryImages = room?.roomImages && room.roomImages.length > 0 
    ? room.roomImages 
    : [
      assets.room1,
      assets.room2,
      assets.room3,
      assets.room4,
      assets.room5,
      assets.room6,
      assets.room7,
    ]

  const handleCheckAvailability = (e) => {
    e.preventDefault()
    
    if (!checkInDate || !checkOutDate || !numberOfGuests) {
      alert('Please fill in all fields')
      return
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert('Check-out date must be after check-in date')
      return
    }

    if (room.available) {
      alert('Room is available for your selected dates!')
      setShowBookNow(true)
      setIsChecked(true)
    } else {
      alert('Room is not available for your selected dates')
      setShowBookNow(false)
      setIsChecked(true)
    }
  }

  const handleBookNow = () => {
    // Just handle the booking action without alert
    // You can add booking logic here later
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      {/* <MakeBookingsHeader/> */}

      {/* Room Details */}
      {room && typeof room === 'object' ? (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-10'>

          {/* Image Gallery */}
          <div className='mb-8 flex flex-col items-center space-y-4'>
            {/* Main Image */}
            <div className="w-full">
              <img
                src={mainImage}
                alt={room.name}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg transition duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 w-full gap-4">
              {galleryImages.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room view ${index + 1}`}
                  onClick={() => setMainImage(image)}
                  className={`rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80 transition duration-200 ${
                    mainImage === image ? "ring-4 ring-primary" : "ring-2 ring-gray-200"
                  }`}
                />
              ))}
            </div>
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
          </div>

          {/* About Section */}
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Overview</h2>
            <p className='text-gray-600 leading-relaxed'>{room.about}</p>
          </div>

          {/* Amenities Section */}
          {room.amenities && (Array.isArray(room.amenities) ? room.amenities.length > 0 : room.amenities) && (
            <div className='mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Amenities</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {(Array.isArray(room.amenities) ? room.amenities : (room.amenities?.split(',').map(a => a.trim()) || [])).map((amenity, index) => (
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

          {/* Booking Form */}
          <form onSubmit={handleCheckAvailability} className='bg-white border-2 border-gray-200 text-gray-700 rounded-lg px-4 py-4 mb-8'>
            
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
              {/* Check-in Date */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                  <img src={assets.calenderIcon} alt="calendar" className='w-4 h-4' />
                  Check-in Date <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={today}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm'
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                  <img src={assets.calenderIcon} alt="calendar" className='w-4 h-4' />
                  Check-out Date <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || today}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm'
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
                  <img src={assets.guestsIcon} alt="guests" className='w-4 h-4' />
                  Number of Guests <span className='text-red-500'>*</span>
                </label>
                <input
                  type='number'
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  min='1'
                  max='10'
                  required
                  placeholder='Enter guests'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm'
                />
              </div>

              {/* Button */}
              <div>
                {!showBookNow ? (
                  <button
                    type='submit'
                    className='w-full bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 text-sm'
                  >
                    Check Availability
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleBookNow}
                    disabled={!room.available}
                    className={`w-full px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                      room.available 
                        ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {room.available ? `Book Now` : 'Not Available'}
                  </button>
                )}
              </div>
            </div>
          </form>

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
          {/* <div className='mt-8'>
            <button 
              disabled={!room.available}
              className={`w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                room.available 
                  ? 'bg-primary text-white hover:scale-105 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {room.available ? `Book Now - Rs. ${room.pricePerNight}` : 'Currently Unavailable'}
            </button>
          </div> */}

          {/* Location Section */}
          <div className='mb-8 mt-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Location</h2>
            <iframe 
              src={room.map} 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className='rounded-lg mb-4'
            ></iframe>
            
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
