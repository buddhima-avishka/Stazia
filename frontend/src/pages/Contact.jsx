import React from 'react'
import ContactHeader from '../components/ContactHeader'

function Contact() {
  return (
    <div>
      <ContactHeader/>
      {/* Additional contact page content can go here */}
      <div className='text-center pt-10'>
        <h1 className='melodin text-3xl md:text-4xl font-bold text-gray-500 mb-4'>We’re Always Here for You</h1>
        <p className='soligant text-gray-900 text-lg leading-relaxed max-w-3xl mx-auto'>Whether you’re booking your next stay or need help managing an existing reservation, our friendly support team is just a message away.</p>
      </div>
      <div className='pt-10 pb-10'>
        <form className="flex flex-col items-center text-sm">
            <p className="text-lg text-primary font-medium pb-2">Contact Us</p>
            <h1 className="melodin text-4xl font-semibold text-gray-500 pb-4">Get in touch with us</h1>
            <p className="soligant text-sm text-gray-900 text-center pb-10">Have questions, feedback, or need help with your booking? <br /> Our friendly support team at Stayzia is here to assist you anytime.</p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                <div className="w-full">
                    <label className="text-black/70" htmlFor="name">Your Name</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                </div>
                <div className="w-full">
                    <label className="text-black/70" htmlFor="name">Your Email</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="email" required />
                </div>
            </div>
        
            <div className="mt-6 w-[350px] md:w-[700px]">
                <label className="text-black/70" htmlFor="name">Message</label>
                <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300" required></textarea>
            </div>
        
            <button type="submit" className="mt-5 bg-primary text-white h-12 w-56 px-4 rounded active:scale-95 transition hover:bg-primary/90">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
