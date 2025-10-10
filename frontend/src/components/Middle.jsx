import React from 'react'

function Middle() {
  return (
    <div>
      <div className="bg-black/90 p-5 mt-20 rounded-lg flex flex-col md:flex-row justify-between w-full gap-10">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-xl font-semibold text-white">See it all</h1>
          <p className="text-white text-xs">
          From local hotels to global brands, <br /> discover millions of rooms all around the <br />world.
          </p>
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <h1 className="text-xl font-semibold text-white">Compare right here</h1>
          <p className="text-white text-xs">
          No need to search anywhere else. The <br /> biggest names in travel are right here.
          </p>
        </div>
        <div className='flex flex-col gap-5 items-center'>
          <h1 className="text-xl font-semibold text-white">Get exclusive rates</h1>
          <p className="text-white text-xs">
          We‘ve special deals with the world’s <br /> leading hotels and we these savings with <br /> you.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Middle