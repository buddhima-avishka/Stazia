import React from 'react'
import { assets } from '../assets/assets.js'
import { cities } from '../assets/assets'

function Header() {
  return (
    <div 
      className='relative rounded-lg overflow-hidden min-h-[500px] md:min-h-[600px]'
      style={{
        backgroundImage: `url(${assets.header_img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability (optional) */}
      <div className='absolute inset-0 bg-black/30'></div>

      {/* ----left side - top left corner---- */}
      <div className='absolute top-0 left-0 z-10 max-w-xl flex flex-col items-start justify-start gap-4 p-6 md:p-10 lg:p-12'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Explore your place <br />to stay
        </p>
        <p className='text-white text-sm md:text-base'>Discover the finest hotels from all over the world.</p>
        

        {/* Booking Form */}
        <form className='bg-white text-gray-500 rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.locationIcon} alt="" />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                  {cities.map((city, index)=>(
                    <option value={city} key={index} />
                  ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-primary py-2 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="" />
                <span>Search</span>
            </button>
        </form>
      </div>

      {/* right side - bottom right corner */}
      <div className='absolute bottom-0 right-0 z-10 max-w-md flex flex-col justify-end gap-3 p-6 md:p-10 lg:p-12 text-left'>
        <p className='text-base md:text-lg text-white'>
          We provide a variety of the best <br /> lodging accommodations for those <br /> of you who need it.
        </p>
        <p className='text-sm md:text-base text-white/90'>Don't worry about the quality of the service.</p>
      </div>

    </div>
  )
}

export default Header