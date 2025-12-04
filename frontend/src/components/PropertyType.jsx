import React from 'react'
import { propertyType } from '../assets/assets'
import { Link } from 'react-router-dom'

function PropertyType() {
  return (
    <div className='flex flex-col pt-5 px-4 sm:px-6 lg:px-8' id='property'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl text-gray-500 pb-5 font-semibold leading-tight md:leading-tight lg:leading-tight'>Browse by property type</h1>
      <p className='text-sm md:text-base text-gray pb-5'>you can easily browse and filter your search by property type. This feature allows you to select hotels or alternative options, such as hostels, vacation rentals, or bed and breakfasts, based on your preferences and specific needs for your stay.</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {propertyType.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-md cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/stays/${item.property}`}>
            <p>{item.property}</p>
            <img src={item.image} alt="" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PropertyType