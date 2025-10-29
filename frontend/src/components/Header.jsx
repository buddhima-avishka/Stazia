import React from 'react'
import { assets } from '../assets/assets.js'
import { cities } from '../assets/assets'

function Header() {
  const [showForm, setShowForm] = React.useState(false)

  return (
    <div 
      className='relative items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden h-screen px-6 md:px-16 lg:px-24 xl:px-32 '
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
      <div className='absolute top-0 left-0 z-10 max-w-xl flex flex-col items-start justify-start gap-4 p-6 md:p-10 lg:p-12 pt-28 md:pt-32 lg:pt-36'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Explore your place <br />to stay
        </p>
        <p className='text-white text-sm md:text-base'>Discover the finest hotels from all over the world.</p>

        <div className="flex items-center divide-x divide-gray-300">
            <div className="flex -space-x-3 pr-3">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[2]" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="image" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[3]" />
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="image" className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[4]" />
            </div>
            <div className="pl-3">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                    <p className="text-gray-600 font-medium ml-2">5.0</p>
                </div>
                <p className="text-sm text-white">Trusted by <span className="font-medium text-gray-800">100,000+</span> users</p>
            </div>
        </div>
        

        {/* Toggle Button for Mobile - only show on small screens */}
        <button 
          onClick={() => setShowForm(!showForm)}
          className='md:hidden flex items-center justify-center gap-2 rounded-md bg-primary py-2 px-4 text-white hover:bg-primary/90 transition-all w-full text-sm'
        >
          <img src={assets.searchIcon} alt="" className='w-5 h-5 sm:w-4 sm:h-4' />
          <span>{showForm ? 'Hide Search' : 'Search Hotels'}</span>
        </button>

        {/* Booking Form */}
        <form className={`bg-white text-gray-500 rounded-lg px-5 sm:px-4 md:px-5 py-4 sm:py-3 md:py-4 flex flex-col md:flex-row max-md:items-start gap-4 sm:gap-3 md:gap-4 max-md:w-full ${showForm ? 'block' : 'hidden md:flex'}`}>

            <div className='w-full sm:w-auto'>
                <div className='flex items-center gap-2 sm:gap-1.5 md:gap-2'>
                    <img src={assets.locationIcon} alt="" className='w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                    <label htmlFor="destinationInput" className='text-sm sm:text-xs md:text-sm'>Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className="rounded border border-gray-200 px-3 sm:px-2 md:px-3 py-2 sm:py-1 md:py-2 mt-1.5 sm:mt-1 md:mt-1.5 text-sm sm:text-xs md:text-sm outline-none w-full md:w-32 lg:w-36" placeholder="Type here" required />
                <datalist id='destinations'>
                  {cities.map((city, index)=>(
                    <option value={city} key={index} />
                  ))}
                </datalist>
            </div>

            <div className='w-full sm:w-auto'>
                <div className='flex items-center gap-2 sm:gap-1.5 md:gap-2'>
                    <img src={assets.calenderIcon} alt="" className='w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                    <label htmlFor="checkIn" className='text-sm sm:text-xs md:text-sm'>Check in</label>
                </div>
                <input id="checkIn" type="date" className="rounded border border-gray-200 px-3 sm:px-2 md:px-3 py-2 sm:py-1 md:py-2 mt-1.5 sm:mt-1 md:mt-1.5 text-sm sm:text-xs md:text-sm outline-none w-full md:w-32 lg:w-36" />
            </div>

            <div className='w-full sm:w-auto'>
                <div className='flex items-center gap-2 sm:gap-1.5 md:gap-2'>
                    <img src={assets.calenderIcon} alt="" className='w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                    <label htmlFor="checkOut" className='text-sm sm:text-xs md:text-sm'>Check out</label>
                </div>
                <input id="checkOut" type="date" className="rounded border border-gray-200 px-3 sm:px-2 md:px-3 py-2 sm:py-1 md:py-2 mt-1.5 sm:mt-1 md:mt-1.5 text-sm sm:text-xs md:text-sm outline-none w-full md:w-32 lg:w-36" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center w-full sm:w-auto'>
                <div className='flex items-center gap-2 sm:gap-1.5 md:gap-2'>
                    <img src={assets.guestsIcon} alt="" className='w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                    <label htmlFor="guests" className='text-sm sm:text-xs md:text-sm'>Guests</label>
                </div>
                <input min={1} max={4} id="guests" type="number" className="rounded border border-gray-200 px-3 sm:px-2 md:px-3 py-2 sm:py-1 md:py-2 mt-1.5 sm:mt-1 md:mt-1.5 text-sm sm:text-xs md:text-sm outline-none w-20 sm:w-16 md:w-20" placeholder="0" />
            </div>

            <div className='flex items-center md:ml-2 lg:ml-3 w-full sm:w-auto'>
                <button className='flex items-center justify-center gap-2 sm:gap-1.5 md:gap-2 rounded-md bg-primary py-2.5 sm:py-1.5 md:py-2.5 px-5 sm:px-4 md:px-5 text-white cursor-pointer w-full hover:bg-primary/90 transition-all text-sm sm:text-xs md:text-sm' >
                    <img src={assets.searchIcon} alt="" className='w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                    <span>Search</span>
                </button>
            </div>
        </form>
        
      </div>

      {/* right side - bottom right corner - hidden on mobile */}
      <div className='hidden sm:flex absolute bottom-0 right-0 z-10 max-w-md flex-col justify-end gap-3 p-6 md:p-10 lg:p-12'>
        <div className='border-l-4 border-primary pl-4 md:pl-6'>
          <p className='text-base md:text-lg text-white'>
            We provide a variety of the best <br /> lodging accommodations for those <br /> of you who need it.
          </p>
          <p className='text-sm md:text-base text-white/90'>Don't worry about the quality of the service.</p>
        </div>
      </div>

    </div>
  )
}

export default Header