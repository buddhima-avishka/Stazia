import React, { useEffect, useState } from 'react'
import AllStaysHeader from '../components/AllStaysHeader'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { assets, facilityIcons } from '../assets/assets';

function Stays() {

  const { property } = useParams()
  const [filterStay, setFilterStay] = useState([])
  const [activeFilters, setActiveFilters] = useState(null)

  const {rooms, searchParams, setSearchParams} = useContext(AppContext)
  const navigate = useNavigate() 

  // Scroll to top when component mounts or property changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [property])

  const applyFilter = () => {
    let results = [...rooms]
    
    // Property filter from route param
    if(property){
      results = results.filter(stay => stay.property === property)
    }
    
    // Search params filter from header form
    if(searchParams && searchParams.destination) {
      results = results.filter(stay => 
        stay.location && stay.location.toLowerCase().includes(searchParams.destination.toLowerCase())
      )
    }
    
    setFilterStay(results)
  }

  useEffect(() => {
    applyFilter()
  },[rooms, property, searchParams])

  // Re-apply filters when activeFilters changes
  useEffect(() => {
    if (!activeFilters) return
    let results = [...rooms]

    // property filter from route param
    if (property) results = results.filter(stay => stay.property === property)
    
    // Search params filter from header form
    if(searchParams && searchParams.destination) {
      results = results.filter(stay => 
        stay.location && stay.location.toLowerCase().includes(searchParams.destination.toLowerCase())
      )
    }

    // room type filters
    const roomFilters = []
    if (activeFilters.singleBed) roomFilters.push('Single Bed')
    if (activeFilters.doubleBed) roomFilters.push('Double Bed')
    if (activeFilters.familySuite) roomFilters.push('Family Suite')
    if (activeFilters.luxuryRoom) roomFilters.push('Luxury Room')
    if (roomFilters.length) results = results.filter(stay => roomFilters.includes(stay.roomType))

    // price filters (multiple ranges allowed)
    const priceRanges = []
    if (activeFilters.price2500_5000) priceRanges.push([2500,5000])
    if (activeFilters.price5000_8000) priceRanges.push([5000,8000])
    if (activeFilters.price8000_15000) priceRanges.push([8000,15000])
    if (priceRanges.length) {
      results = results.filter(stay => {
        const price = Number(stay.pricePerNight)
        return priceRanges.some(([min,max]) => price >= min && price <= max)
      })
    }

    // sorting (only one active)
    if (activeFilters.sortLowHigh) results.sort((a,b) => Number(a.pricePerNight) - Number(b.pricePerNight))
    if (activeFilters.sortHighLow) results.sort((a,b) => Number(b.pricePerNight) - Number(a.pricePerNight))
    if (activeFilters.newestFirst) results = results.reverse()

    setFilterStay(results)
  }, [activeFilters, rooms, property, searchParams])

  return (
    <div>
      <AllStaysHeader onFiltersChange={setActiveFilters} />
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        
        {/* Search Results Info */}
        {searchParams && searchParams.destination && (
          <div className='pt-6 pb-2'>
            <div className='bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start justify-between'>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Search Results</h3>
                <div className='flex flex-wrap gap-3 text-sm text-gray-600'>
                  {searchParams.destination && (
                    <div className='flex items-center gap-2'>
                      <img src={assets.locationIcon} alt="location" className='w-4 h-4' />
                      <span><strong>Destination:</strong> {searchParams.destination}</span>
                    </div>
                  )}
                  {searchParams.checkIn && (
                    <div className='flex items-center gap-2'>
                      <img src={assets.calenderIcon} alt="check-in" className='w-4 h-4' />
                      <span><strong>Check-in:</strong> {new Date(searchParams.checkIn).toLocaleDateString()}</span>
                    </div>
                  )}
                  {searchParams.checkOut && (
                    <div className='flex items-center gap-2'>
                      <img src={assets.calenderIcon} alt="check-out" className='w-4 h-4' />
                      <span><strong>Check-out:</strong> {new Date(searchParams.checkOut).toLocaleDateString()}</span>
                    </div>
                  )}
                  {searchParams.guests && (
                    <div className='flex items-center gap-2'>
                      <img src={assets.guestsIcon} alt="guests" className='w-4 h-4' />
                      <span><strong>Guests:</strong> {searchParams.guests}</span>
                    </div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setSearchParams({ destination: '', checkIn: '', checkOut: '', guests: 1 })}
                className='text-sm text-gray-600 hover:text-gray-800 underline ml-4'
              >
                Clear
              </button>
            </div>
            <p className='text-gray-600 mt-3'>Found <strong>{filterStay.length}</strong> {filterStay.length === 1 ? 'property' : 'properties'}</p>
          </div>
        )}
        
        <div className='pt-10 pb-10 flex flex-col gap-6'>
          {filterStay.length === 0 ? (
            <div className='text-center py-20'>
              <div className='flex flex-col items-center gap-4'>
                <img src={assets.searchIcon} alt="no results" className='w-20 h-20 opacity-30' />
                <h3 className='text-2xl font-semibold text-gray-700'>No properties found</h3>
                <p className='text-gray-500'>Try adjusting your search or filters</p>
                {searchParams && searchParams.destination && (
                  <button 
                    onClick={() => setSearchParams({ destination: '', checkIn: '', checkOut: '', guests: 1 })}
                    className='mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-all'
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          ) : (
            filterStay.map((item, index) => (
              <React.Fragment key={index}>
                <div className='flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                  {/* Image on Left */}
                  <div className='md:w-1/4 h-48 md:h-56 relative group flex items-center justify-center bg-gray-100'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-lg'/>
                    <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-md flex items-center gap-1">
                      <img src={assets.starIconFilled} alt="star" className='w-4 h-4' />
                      <span className="text-sm font-semibold">{item.rating}</span>
                    </div>
                  </div>

                  {/* Details on Right */}
                  <div className='md:w-3/4 p-4 sm:p-6 flex flex-col justify-between'>
                  <div>
                    <div className='flex justify-between items-start mb-2'>
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{item.name}</h3>
                      <div className='text-right'>
                        <p className="text-2xl font-bold text-primary">Rs. {item.pricePerNight}</p>
                        <p className="text-sm text-gray-500">per night</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 mb-2'>
                      <img src={assets.locationIcon} alt="location" className='w-4 h-4' />
                      <p className="text-gray-600">{item.location}</p>
                    </div>

                    <div className='flex items-center gap-2 mb-3'>
                      <img src={assets.homeIcon} alt="room" className='w-4 h-4' />
                      <p className="text-gray-600">{item.roomType}</p>
                    </div>

                    {/* Amenities */}
                    <div className='mb-4'>
                      <p className='text-sm font-semibold text-gray-700 mb-2'>Amenities:</p>
                      <div className='flex flex-wrap gap-3'>
                        {(() => {
                          // Parse amenities - handle both string and array formats
                          let amenitiesList = []
                          
                          if (typeof item.amenities === 'string') {
                            try {
                              // Try parsing as JSON first
                              amenitiesList = JSON.parse(item.amenities)
                            } catch (error) {
                              // If JSON parse fails, try splitting by comma
                              amenitiesList = item.amenities.split(',').map(a => a.trim()).filter(a => a)
                            }
                          } else if (Array.isArray(item.amenities)) {
                            amenitiesList = item.amenities
                          }
                          
                          return amenitiesList.map((amenity, idx) => (
                            <div key={idx} className='flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-md'>
                              {facilityIcons[amenity] && (
                                <img src={facilityIcons[amenity]} alt={amenity} className='w-4 h-4' />
                              )}
                              <span className='text-sm text-gray-700'>{amenity}</span>
                            </div>
                          ))
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center justify-between mt-4'>
                    <span className='text-sm text-gray-500'>{item.property}</span>
                    <button 
                      onClick={() => navigate(`/MakeBookings/${item._id}`)} 
                      className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary/90 transition-all"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Horizontal Line - don't show after last item */}
              {index < filterStay.length - 1 && (
                <hr className='my-6 border-gray-200' />
              )}
            </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Stays
