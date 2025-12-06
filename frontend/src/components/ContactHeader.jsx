import React from 'react'
import { assets } from '../assets/assets'

function ContactHeader() {
  return (
    <div 
              className='relative overflow-hidden min-h-[500px] md:min-h-[600px]'
              style={{
                backgroundImage: `url(${assets.contactusHeader_img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay for better text readability (optional) */}
              <div className='absolute inset-0 bg-black/30'></div>
        
              {/* ----left side - top left corner---- */}
              <div className='absolute top-0 left-0 z-10 max-w-3xl flex flex-col items-start justify-start gap-4 p-6 md:p-10 lg:p-12 mt-12'>
                <p className='dolce text-5xl md:text-6xl lg:text-8xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight pt-12'>
                  Contact Us
                </p>
                <p className='soligant text-white text-sm md:text-base'>We're here to help you every step of the way — from finding the perfect hotel to managing your bookings with ease. If you have any questions, feedback, or need support, feel free to reach out to us through any of the channels below.</p>
                
              </div>
    </div>
  )
}

export default ContactHeader