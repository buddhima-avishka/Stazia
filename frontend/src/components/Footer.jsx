import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-white bg-black/90">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-2xl flex flex-col gap-4">
                    <img className='w-32 h-auto' src={assets.logo} alt="" />
                    <p className="text-sm leading-relaxed">
                        Your trusted partner for booking hotels across Sri Lanka. Explore handpicked stays, enjoy exclusive deals, and experience seamless travel planning with our secure and user-friendly platform. Stay connected with us for the latest offers, travel tips, and updates on Sri Lanka's top destinations.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-white">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About us</a></li>
                            <li><a href="/contact">Contact us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-white">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+1-212-456-7890</p>
                            <p>stayzia@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2024 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All Right Reserved.
            </p>
        </footer>
    </div>
  )
}

export default Footer