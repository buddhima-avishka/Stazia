import React from 'react'

function Middle() {
  return (
    <div className='w-full bg-black/90 py-16 px-4 sm:px-6 lg:px-8 mt-10'>
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 items-center text-center flex-1">
            <h1 className="melodin text-xl font-semibold text-white">See it all</h1>
            <p className="soligant text-white text-sm leading-relaxed">
              Explore Sri Lanka’s finest hotels, resorts, and scenic escapes in one place, offering travelers a complete collection of island-wide stays.
            </p>
          </div>
          <div className='flex flex-col gap-5 items-center text-center flex-1'>
            <h1 className="melodin text-xl font-semibold text-white">Compare right here</h1>
            <p className="soligant text-white text-sm leading-relaxed">
              Compare Sri Lanka’s top hotels effortlessly with clear prices, amenities, locations, and guest ratings to choose the perfect stay confidently.
            </p>
          </div>
          <div className='flex flex-col gap-5 items-center text-center flex-1'>
            <h1 className="melodin text-xl font-semibold text-white">Get exclusive rates</h1>
            <p className="soligant text-white text-sm leading-relaxed">
              Access exclusive hotel discounts across Sri Lanka, giving travelers better prices, extra value, and meaningful savings on each unforgettable stay.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Middle