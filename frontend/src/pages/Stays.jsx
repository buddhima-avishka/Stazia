import React, { useEffect, useState } from 'react'
import AllStaysHeader from '../components/AllStaysHeader'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

function Stays() {

  const { property } = useParams()
  const [filterStay, setFilterStay] = useState([])
  const [activeFilters, setActiveFilters] = useState(null)

  const {stays} = useContext(AppContext)
  const navigate = useNavigate() 

  const applyFilter = () => {
    if(property){
      setFilterStay(stays.filter(stay => stay.property === property))
    } else {
      setFilterStay(stays)
    }
  }

  useEffect(() => {
    applyFilter()
  },[stays,property])

  // Re-apply filters when activeFilters changes
  useEffect(() => {
    if (!activeFilters) return
    let results = [...stays]

    // property filter from route param
    if (property) results = results.filter(stay => stay.property === property)

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
  }, [activeFilters, stays, property])

  return (
    <div>
      <AllStaysHeader onFiltersChange={setActiveFilters} />
      <div>
        <div className='pt-10 pb-10'>
          {
            filterStay.map((item, index) => (
                    <div className='w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300 flex flex-col bg-gray-200'>
                      <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-lg'/>
                      <p className="absolute top-2 left-2 text-black text-sm font-semibold mb-2 pl-2 pr-2 bg-white">{item.rating}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">{item.name}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">{item.location}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">Rs. {item.pricePerNight}</p>
                      <div className="flex flex-col items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20 rounded-lg">
                        <button onClick={()=>navigate(`/MakeBookings/${item._id}`)} className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-md">Visit Details</button>
                      </div>
                    </div>
        ))
          }
        </div>
      </div>
    </div>
  )
}

export default Stays
