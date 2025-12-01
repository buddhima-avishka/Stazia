import React, { useContext, useEffect, useState } from 'react'
import { HotelContext } from '../../context/HotelContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

function HotelProfile() {
  const { hToken, backendUrl } = useContext(HotelContext)
  const [hotelData, setHotelData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [roomImages, setRoomImages] = useState([])
  
  // Available locations
  const locations = [
    'Matara', 'Galle', 'Hambantota', 'Colombo', 'Gampaha', 'Kalutara', 
    'Kandy', 'Matale', 'Nuwara Eliya', 'Badulla', 'Monaragala', 'Jaffna', 
    'Mannar', 'Vavuniya', 'Mullaitivu', 'Kilinochchi', 'Trincomalee', 
    'Batticaloa', 'Ampara', 'Anuradhapura', 'Polonnaruwa', 'Kurunegala', 
    'Puttalam', 'Ratnapura', 'Kegalle'
  ]
  
  // Available amenities options
  const availableAmenities = [
    'Free WiFi',
    'Swimming Pool',
    'Spa',
    'Gym',
    'Restaurant',
    'Bar',
    'Room Service',
    'Parking',
    'Air Conditioning',
    'TV',
    'Mini Bar',
    'Laundry Service',
    'Beach Access',
    'Balcony',
    'Kitchen',
    'Jacuzzi'
  ]
  
  // Form state for editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    pricePerNight: '',
    about: '',
    roomType: '',
    property: '',
    rating: '',
    amenities: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
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

  // Get hotel profile data
  const getHotelProfile = async () => {
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
        backendUrl + '/api/hotel/profile',
        { hotelId },
        { headers: { hToken } }
      )

      if (data.success) {
        setHotelData(data.hotelData)
        console.log('Hotel data loaded:', data.hotelData)
        
        // Parse amenities
        let parsedAmenities = []
        try {
          parsedAmenities = typeof data.hotelData.amenities === 'string' 
            ? JSON.parse(data.hotelData.amenities) 
            : Array.isArray(data.hotelData.amenities) 
            ? data.hotelData.amenities 
            : []
        } catch (error) {
          console.log('Error parsing amenities:', error)
          parsedAmenities = []
        }
        
        // Initialize form data
        setFormData({
          name: data.hotelData.name || '',
          email: data.hotelData.email || '',
          location: data.hotelData.location || '',
          pricePerNight: data.hotelData.pricePerNight || '',
          about: data.hotelData.about || '',
          roomType: data.hotelData.roomType || '',
          property: data.hotelData.property || '',
          rating: data.hotelData.rating || '',
          amenities: parsedAmenities,
          address: {
            street: data.hotelData.address?.street || '',
            city: data.hotelData.address?.city || '',
            state: data.hotelData.address?.state || '',
            zipCode: data.hotelData.address?.zipCode || ''
          }
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log('Error loading profile:', error)
      toast.error(error.response?.data?.message || error.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hToken) {
      getHotelProfile()
    }
  }, [hToken])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }))
  }

  // Handle amenities checkbox changes
  const handleAmenityChange = (amenity) => {
    setFormData(prev => {
      const amenities = prev.amenities || []
      const exists = amenities.includes(amenity)
      
      if (exists) {
        return {
          ...prev,
          amenities: amenities.filter(a => a !== amenity)
        }
      } else {
        return {
          ...prev,
          amenities: [...amenities, amenity]
        }
      }
    })
  }

  // Save profile changes
  const saveProfile = async () => {
    try {
      const decoded = decodeToken(hToken)
      const hotelId = decoded.id

      const formDataToSend = new FormData()
      formDataToSend.append('hotelId', hotelId)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('pricePerNight', formData.pricePerNight)
      formDataToSend.append('about', formData.about)
      formDataToSend.append('roomType', formData.roomType)
      formDataToSend.append('property', formData.property)
      formDataToSend.append('rating', formData.rating)
      formDataToSend.append('amenities', JSON.stringify(formData.amenities))
      formDataToSend.append('address', JSON.stringify(formData.address))

      // Append room images if new images are selected
      if (roomImages.length > 0) {
        roomImages.forEach((image) => {
          formDataToSend.append('roomImages', image)
        })
      }

      const { data } = await axios.post(
        backendUrl + '/api/hotel/update-profile',
        formDataToSend,
        { headers: { hToken } }
      )

      if (data.success) {
        toast.success('Profile updated successfully!')
        setIsEdit(false)
        setRoomImages([])
        getHotelProfile() // Refresh data
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log('Error updating profile:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  }

  // Cancel edit mode
  const cancelEdit = () => {
    setIsEdit(false)
    // Reset form data to original hotel data
    if (hotelData) {
      // Parse amenities
      let parsedAmenities = []
      try {
        parsedAmenities = typeof hotelData.amenities === 'string' 
          ? JSON.parse(hotelData.amenities) 
          : Array.isArray(hotelData.amenities) 
          ? hotelData.amenities 
          : []
      } catch (error) {
        parsedAmenities = []
      }
      
      setFormData({
        name: hotelData.name || '',
        email: hotelData.email || '',
        location: hotelData.location || '',
        pricePerNight: hotelData.pricePerNight || '',
        about: hotelData.about || '',
        roomType: hotelData.roomType || '',
        property: hotelData.property || '',
        rating: hotelData.rating || '',
        amenities: parsedAmenities,
        address: {
          street: hotelData.address?.street || '',
          city: hotelData.address?.city || '',
          state: hotelData.address?.state || '',
          zipCode: hotelData.address?.zipCode || ''
        }
      })
      setRoomImages([])
    }
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

  if (!hotelData) {
    return (
      <div className='w-full max-w-7xl m-5'>
        <p className='text-gray-500'>No profile data available</p>
      </div>
    )
  }

  // Parse amenities if it's a string
  let amenitiesList = []
  try {
    amenitiesList = typeof hotelData.amenities === 'string' 
      ? JSON.parse(hotelData.amenities) 
      : Array.isArray(hotelData.amenities) 
      ? hotelData.amenities 
      : []
  } catch (error) {
    console.log('Error parsing amenities:', error)
    amenitiesList = []
  }

  return (
    <div className='w-full max-w-7xl m-5'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
        <h1 className='text-3xl font-semibold'>Hotel Profile</h1>
        <div className='flex items-center gap-3'>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            hotelData.available 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {hotelData.available ? 'Available' : 'Unavailable'}
          </span>
          
          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className='flex items-center gap-2 border-2 px-6 py-2.5 rounded-lg font-medium transition-all hover:opacity-90'
              style={{borderColor: '#C49C74', color: '#C49C74'}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#C49C74'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#C49C74'
              }}
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className='flex gap-2'>
              <button
                onClick={cancelEdit}
                className='px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium'
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className='px-6 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 font-medium hover:opacity-90'
                style={{backgroundColor: '#C49C74'}}
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                </svg>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className='space-y-6'>
        {/* Comprehensive Profile Section */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='p-8'>
            {/* Profile Header with Image */}
            <div className='flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-200'>
              {/* Profile Picture */}
              <div className='flex-shrink-0'>
                <div className='w-48 h-48 rounded-xl overflow-hidden border-4 border-gray-100 shadow-lg'>
                  <img 
                    src={hotelData.image} 
                    alt={hotelData.name}
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className='flex-grow'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='md:col-span-2'>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Hotel Name</label>
                    {isEdit ? (
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      />
                    ) : (
                      <div className='flex items-center gap-3'>
                        <p className='text-3xl font-bold text-gray-900'>{hotelData.name}</p>
                        <div className='flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-lg border border-yellow-200'>
                          <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                          </svg>
                          <span className='text-lg font-bold text-gray-900'>{hotelData.rating}</span>
                        </div>
                      </div>
                    )}

                  </div>
                  
                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Email</label>
                    {isEdit ? (
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      />
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Location</label>
                    {isEdit ? (
                      <select
                        name='location'
                        value={formData.location}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      >
                        {locations.map((loc, index) => (
                          <option key={index} value={loc}>{loc}</option>
                        ))}
                      </select>
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.location}</p>
                    )}
                  </div>

                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Room Type</label>
                    {isEdit ? (
                      <select
                        name='roomType'
                        value={formData.roomType}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      >
                        <option value='Single'>Single Bed</option>
                        <option value='Double'>Double Bed</option>
                        <option value='Suite'>Family Suite</option>
                        <option value='Deluxe'>Luxury Room</option>
                      </select>
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.roomType}</p>
                    )}
                  </div>

                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Property Type</label>
                    {isEdit ? (
                      <select
                        name='property'
                        value={formData.property}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      >
                        <option value='Hotel'>Hotel</option>
                        <option value='Resort'>Resort</option>
                        <option value='Villa'>Villa</option>
                        <option value='Guest House'>Cottage</option>
                        <option value='Apartment'>Apartment</option>
                      </select>
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.property}</p>
                    )}
                  </div>

                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Price Per Night</label>
                    {isEdit ? (
                      <input
                        type='number'
                        name='pricePerNight'
                        value={formData.pricePerNight}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                        placeholder='Enter price'
                      />
                    ) : (
                      <div className='flex items-baseline gap-2'>
                        <span className='text-2xl font-bold' style={{color: '#C49C74'}}>
                          LKR {hotelData.pricePerNight.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className='mb-8 pb-8 border-b border-gray-200'>
              <h3 className='text-xl font-semibold mb-3 flex items-center gap-2'>
                <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                About This Property
              </h3>
              {isEdit ? (
                <textarea
                  name='about'
                  value={formData.about}
                  onChange={handleInputChange}
                  rows='5'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none'
                  style={{focusRingColor: '#C49C74'}}
                  placeholder='Describe your property...'
                />
              ) : (
                <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{hotelData.about}</p>
              )}
            </div>

            {/* Amenities Section */}
            <div className='mb-8 pb-8 border-b border-gray-200'>
              <h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
                <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
                </svg>
                Amenities
              </h3>
              {isEdit ? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                  {availableAmenities.map((amenity, index) => {
                    const isChecked = formData.amenities && formData.amenities.includes(amenity)
                    return (
                      <label 
                        key={index} 
                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                          isChecked 
                            ? 'bg-amber-50 border-amber-300' 
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type='checkbox'
                          checked={isChecked}
                          onChange={() => handleAmenityChange(amenity)}
                          className='w-5 h-5 rounded accent-amber-500 cursor-pointer'
                        />
                        <span className='text-gray-700 text-sm'>{amenity}</span>
                      </label>
                    )
                  })}
                </div>
              ) : (
                amenitiesList && amenitiesList.length > 0 ? (
                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {amenitiesList.map((amenity, index) => (
                      <div key={index} className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
                        <svg className='w-5 h-5 flex-shrink-0' style={{color: '#C49C74'}} fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                        </svg>
                        <span className='text-gray-700 text-sm'>{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-500'>No amenities listed</p>
                )
              )}
            </div>

            {/* Address Section */}
            {((hotelData.address && Object.keys(hotelData.address).length > 0) || isEdit) && (
              <div className='mb-8 pb-8 border-b border-gray-200'>
                <h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
                  <svg className='w-6 h-6' style={{color: '#C49C74'}} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  Address
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Street</label>
                    {isEdit ? (
                      <input
                        type='text'
                        name='street'
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      />
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.address?.street || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>City</label>
                    {isEdit ? (
                      <input
                        type='text'
                        name='city'
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      />
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.address?.city || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>State</label>
                    {isEdit ? (
                      <input
                        type='text'
                        name='state'
                        value={formData.address.state}
                        onChange={handleAddressChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      />
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.address?.state || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-500 mb-1 block'>Zip Code</label>
                    {isEdit ? (
                      <input
                        type='text'
                        name='zipCode'
                        value={formData.address.zipCode}
                        onChange={handleAddressChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
                        style={{focusRingColor: '#C49C74'}}
                      />
                    ) : (
                      <p className='text-lg text-gray-900'>{hotelData.address?.zipCode || '-'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        
      </div>
    </div>
  )
}

export default HotelProfile