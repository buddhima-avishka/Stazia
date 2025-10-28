import React from 'react'
import { assets } from '../assets/assets.js'
import { cities } from '../assets/assets'

function Header() {
  const [showForm, setShowForm] = React.useState(false)

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
        

        {/* Toggle Button for Mobile */}
        <button 
          onClick={() => setShowForm(!showForm)}
          className='md:hidden flex items-center justify-center gap-2 rounded-md bg-primary py-2 px-6 text-white hover:bg-primary/90 transition-all w-full'
        >
          <img src={assets.searchIcon} alt="" />
          <span>{showForm ? 'Hide Search' : 'Search Hotels'}</span>
        </button>

        {/* Booking Form */}
        <form className={`bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-6 max-md:mx-auto ${showForm ? 'block' : 'hidden md:flex'}`}>

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
                <div className='flex items-center gap-2'>
                    <img src={assets.guestsIcon} alt="" />
                    <label htmlFor="guests">Guests</label>
                </div>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <div className='flex items-center md:ml-4 md:mr-2'>
                <button className='flex items-center justify-center gap-2 rounded-md bg-primary py-2 px-6 text-white cursor-pointer max-md:w-full hover:bg-primary/90 transition-all' >
                    <img src={assets.searchIcon} alt="" />
                    <span>Search</span>
                </button>
            </div>
        </form>
        
      </div>

      {/* right side - bottom right corner */}
      <div className='absolute bottom-0 right-0 z-10 max-w-md flex flex-col justify-end gap-3 p-6 md:p-10 lg:p-12'>
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