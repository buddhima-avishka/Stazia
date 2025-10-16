import React, { useEffect, useState } from 'react'
import AllStaysHeader from '../components/AllStaysHeader'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Stays() {

  const { property } = useParams()
  const [filterStay, setFilterStay] = useState([])

  const {stays} = useContext(AppContext)

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

  return (
    <div>
      <AllStaysHeader/>
      <div>
        <div>
          {
            filterStay.map((item, index) => (
                    <div className='w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300 flex flex-col bg-gray-200'>
                      <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-lg'/>
                      <p className="absolute top-2 left-2 text-black text-sm font-semibold mb-2 pl-2 pr-2 bg-white">{item.rating}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">{item.name}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">{item.location}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">$ {item.cost}</p>
                      <div className="flex flex-col items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20 rounded-lg">
                        <button onClick={()=>navigate(`/make-bookings/${item._id}`)} className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-md">Visit Details</button>
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
