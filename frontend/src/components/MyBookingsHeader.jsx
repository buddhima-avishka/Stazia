import React from 'react'
import { assets } from '../assets/assets'

function MyBookingsHeader() {
  return (
    <div 
              className='relative overflow-hidden min-h-[500px] md:min-h-[600px]'
              style={{
                backgroundImage: `url(${assets.mybookingsHeader_img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay for better text readability (optional) */}
              <div className='absolute inset-0 bg-black/30'></div>
        
              {/* ----left side - top left corner---- */}
              <div className='absolute top-0 left-0 z-10 max-w-5xl flex flex-col items-start justify-start gap-4 p-6 md:p-10 lg:p-12 mt-12'>
                <p className='dolce text-5xl md:text-6xl lg:text-8xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight pt-12'>
                  My Bookings
                </p>
                <p className='soligant text-white text-sm md:text-base'>Find your ideal stay with ease—our booking page brings together comfort, convenience, and flexibility in one place. Whether you're planning a weekend escape, a business trip, or a long-awaited adventure, we make the reservation process simple and stress-free. Explore room options, compare amenities, and secure your stay in just a few clicks. Your next unforgettable experience starts right here.</p>
                
              </div>
      </div>
  )
}

export default MyBookingsHeader