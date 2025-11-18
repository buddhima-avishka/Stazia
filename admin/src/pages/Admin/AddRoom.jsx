import React, { useState } from 'react'
import { assets } from '../../assets/assets'

function AddRoom() {

  const [image, setImage] = useState(false)
  const [name, setName] = useState('')
  const [roomType, setRoomType] = useState('Double Bed')
  const [property, setProperty] = useState('Hotels')
  const [roomImages, setRoomImages] = useState([false, false, false, false])
  const [amenities, setAmenities] = useState([])
  const [about, setAbout] = useState('')
  const [pricePerNight, setPricePerNight] = useState('')
  const [location, setLocation] = useState('Kandy')
  const [map, setMap] = useState('')
  const [rating, setRating] = useState('')

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Double Bed");
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("Hotels");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Kandy");

  const availableAmenities = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access']
  const propertyTypes = ['Hotels', 'Apartments', 'Resorts', 'Villas', 'Cottages']
  const roomTypes = ['Single Bed', 'Double Bed', 'Family Suite', 'Luxury Room']
  const locations = ['Kandy', 'Galle', 'Matara', 'Colombo']

  const handleAmenityToggle = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(item => item !== amenity))
    } else {
      setAmenities([...amenities, amenity])
    }
  }

  const handleRoomImageChange = (index, file) => {
    const newRoomImages = [...roomImages]
    newRoomImages[index] = file
    setRoomImages(newRoomImages)
  }

  const handleSelect = (type) => {
        setSelected(type);
        setRoomType(type);
        setIsOpen(false);
    };

  const handlePropertySelect = (type) => {
        setSelectedProperty(type);
        setProperty(type);
        setIsPropertyOpen(false);
    };

  const handleLocationSelect = (loc) => {
        setSelectedLocation(loc);
        setLocation(loc);
        setIsLocationOpen(false);
    };

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    
    try {
      // Form submission logic here
      console.log({
        image,
        name,
        roomType,
        property,
        roomImages,
        amenities,
        about,
        pricePerNight,
        location,
        map,
        rating
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      
      {/* Page Title */}
      <p className='mb-6 text-2xl font-semibold text-gray-800'>Add New Room</p>

      <div className='bg-white px-8 py-8 border rounded-xl w-full max-w-4xl shadow-lg'>
        
        {/* Upload Image */}
        <div className='flex flex-col gap-3 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>Upload Room Image</p>
          <label htmlFor='room-img'>
            <img 
              className='w-32 h-32 object-cover rounded-lg cursor-pointer border-2 border-dashed hover:border-solid transition-all' 
              style={{borderColor: '#C49C74'}}
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              alt="" 
            />
          </label>
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='room-img' 
            hidden 
            required
          />
        </div>

        {/* Room Name */}
        <div className='flex flex-col gap-2 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>Room Name</p>
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all' 
            type="text" 
            placeholder='Kemah Tinggi Hotel'
            required
          />
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-2 mb-6">
            <p className='text-sm font-semibold text-gray-700'>Room Type</p>
            <div className="relative">
                <button type="button" onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left px-4 py-3 border rounded-lg bg-white text-gray-800 border-gray-300 hover:bg-gray-50 focus:outline-none transition-all"
                >
                    <span>{selected}</span>
                    <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 py-2 max-h-60 overflow-auto">
                        {roomTypes.map((type) => (
                            <li 
                                key={type} 
                                className="px-4 py-2 hover:text-white cursor-pointer transition-all" 
                                style={{backgroundColor: selected === type ? '#C49C74' : 'transparent'}}
                                onMouseEnter={(e) => {
                                    if (selected !== type) {
                                        e.target.style.backgroundColor = '#E5D4C1'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selected !== type) {
                                        e.target.style.backgroundColor = 'transparent'
                                    }
                                }}
                                onClick={() => handleSelect(type)}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-2 mb-6">
            <p className='text-sm font-semibold text-gray-700'>Property Type</p>
            <div className="relative">
                <button type="button" onClick={() => setIsPropertyOpen(!isPropertyOpen)}
                    className="w-full text-left px-4 py-3 border rounded-lg bg-white text-gray-800 border-gray-300 hover:bg-gray-50 focus:outline-none transition-all"
                >
                    <span>{selectedProperty}</span>
                    <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isPropertyOpen ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isPropertyOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 py-2 max-h-60 overflow-auto">
                        {propertyTypes.map((type) => (
                            <li 
                                key={type} 
                                className="px-4 py-2 hover:text-white cursor-pointer transition-all" 
                                style={{backgroundColor: selectedProperty === type ? '#C49C74' : 'transparent'}}
                                onMouseEnter={(e) => {
                                    if (selectedProperty !== type) {
                                        e.target.style.backgroundColor = '#E5D4C1'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedProperty !== type) {
                                        e.target.style.backgroundColor = 'transparent'
                                    }
                                }}
                                onClick={() => handlePropertySelect(type)}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

        {/* Upload Room Images */}
        <div className='flex flex-col gap-3 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>Upload Room Images (4 Images)</p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {roomImages.map((img, index) => (
              <div key={index}>
                <label htmlFor={`room-img-${index}`}>
                  <img 
                    className='w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-dashed hover:border-solid transition-all' 
                    style={{borderColor: '#C49C74'}}
                    src={img ? URL.createObjectURL(img) : assets.upload_area} 
                    alt="" 
                  />
                </label>
                <input 
                  onChange={(e) => handleRoomImageChange(index, e.target.files[0])} 
                  type="file" 
                  id={`room-img-${index}`} 
                  hidden 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className='flex flex-col gap-3 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>Amenities</p>
          <div className='flex flex-wrap gap-3'>
            {availableAmenities.map((amenity, index) => (
              <div 
                key={index}
                onClick={() => handleAmenityToggle(amenity)}
                className={`px-4 py-2 rounded-full cursor-pointer transition-all border-2 ${
                  amenities.includes(amenity) 
                    ? 'text-white shadow-md' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                style={amenities.includes(amenity) ? {backgroundColor: '#C49C74', borderColor: '#C49C74'} : {}}
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className='flex flex-col gap-2 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>About Room</p>
          <textarea 
            onChange={(e) => setAbout(e.target.value)} 
            value={about}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none' 
            placeholder='Describe the room details, facilities, and features...'
            rows={5}
            required
          />
        </div>

        {/* Price Per Night */}
        <div className='flex flex-col gap-2 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>Price Per Night (LKR)</p>
          <input 
            onChange={(e) => setPricePerNight(e.target.value)} 
            value={pricePerNight}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all' 
            type="number" 
            placeholder='6000'
            required
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2 mb-6">
            <p className='text-sm font-semibold text-gray-700'>Location</p>
            <div className="relative">
                <button type="button" onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className="w-full text-left px-4 py-3 border rounded-lg bg-white text-gray-800 border-gray-300 hover:bg-gray-50 focus:outline-none transition-all"
                >
                    <span>{selectedLocation}</span>
                    <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isLocationOpen ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280" >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isLocationOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 py-2 max-h-60 overflow-auto">
                        {locations.map((loc) => (
                            <li 
                                key={loc} 
                                className="px-4 py-2 hover:text-white cursor-pointer transition-all" 
                                style={{backgroundColor: selectedLocation === loc ? '#C49C74' : 'transparent'}}
                                onMouseEnter={(e) => {
                                    if (selectedLocation !== loc) {
                                        e.target.style.backgroundColor = '#E5D4C1'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedLocation !== loc) {
                                        e.target.style.backgroundColor = 'transparent'
                                    }
                                }}
                                onClick={() => handleLocationSelect(loc)}
                            >
                                {loc}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

        {/* Google Map Embed Link */}
        <div className='flex flex-col gap-2 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>Google Map Embed Link</p>
          <input 
            onChange={(e) => setMap(e.target.value)} 
            value={map}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all' 
            type="text" 
            placeholder='https://www.google.com/maps/embed?pb=...'
            required
          />
        </div>

        {/* Rating */}
        <div className='flex flex-col gap-2 mb-6'>
          <p className='text-sm font-semibold text-gray-700'>Rating (out of 5)</p>
          <input 
            onChange={(e) => setRating(e.target.value)} 
            value={rating}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all' 
            type="number" 
            step="0.1"
            min="0"
            max="5"
            placeholder='4.9'
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          type='submit'
          className='w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg mt-4' 
          style={{backgroundColor: '#C49C74'}}
        >
          Add Room
        </button>

      </div>
    </form>
  )
}

export default AddRoom