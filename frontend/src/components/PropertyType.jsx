import React from 'react'
import { propertyType } from '../assets/assets'
import { Link } from 'react-router-dom'

function PropertyType() {
  return (
    <div className='flex flex-col pt-16 px-4 sm:px-6 lg:px-8' id='property'>
      <h1 className='melodin text-3xl md:text-4xl lg:text-5xl text-gray-500 pb-5 font-semibold leading-tight md:leading-tight lg:leading-tight'>Browse by property type</h1>
      <p className='soligant text-sm md:text-base text-gray pb-8'>Browse a wide range of stays across Sri Lanka and find the perfect place that matches your travel style. Easily explore different property options and choose what suits you best. Our platform offers a streamlined and user-friendly way to compare accommodation choices, helping you make confident decisions based on your preferences for comfort, convenience, and value. Whether you're planning a relaxing getaway, a business trip, or an extended vacation, this section guides you toward selecting the ideal stay for your journey.</p>
      <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-scroll'>
        {propertyType.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-md cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/stays/${item.property}`}>
            <p className='agoka'>{item.property}</p>
            <img className='rounded-lg' src={item.image} alt="" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PropertyType