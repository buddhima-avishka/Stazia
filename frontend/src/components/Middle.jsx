import React from 'react'

function Middle() {
  return (
    <div className='w-full bg-black/90 py-16 px-4 sm:px-6 lg:px-8 mt-10'>
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 items-center text-center flex-1">
            <h1 className="text-xl font-semibold text-white">See it all</h1>
            <p className="text-white text-sm leading-relaxed">
              From local hotels to global brands, discover millions of rooms all around the world.
            </p>
          </div>
          <div className='flex flex-col gap-5 items-center text-center flex-1'>
            <h1 className="text-xl font-semibold text-white">Compare right here</h1>
            <p className="text-white text-sm leading-relaxed">
              No need to search anywhere else. The biggest names in travel are right here.
            </p>
          </div>
          <div className='flex flex-col gap-5 items-center text-center flex-1'>
            <h1 className="text-xl font-semibold text-white">Get exclusive rates</h1>
            <p className="text-white text-sm leading-relaxed">
              We've special deals with the world's leading hotels and we share these savings with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Middle