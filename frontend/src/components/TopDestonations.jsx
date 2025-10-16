import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function TopDestonations() {

  const navigate = useNavigate() 
  const {stays} = useContext(AppContext)

  const [stopScroll, setStopScroll] = React.useState(false);

  return (
    <>
      <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

    <div className='flex flex-col items-center' id='topDestinations'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl text-gray-500 pb-5 font-semibold leading-tight md:leading-tight lg:leading-tight'>Top Destinations</h1>
      <p className='text-sm md:text-base text-gray pb-5'>Discover our handpicked selection of exceptional properties around the <br /> world, offering unparalleled luxury and unforgettable experiences.</p>
      <div>
        <div className="overflow-hidden mx-4 sm:mx-[10%] relative max-w-6xl mx-auto" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: stays.length * 2500 + "ms" }}>
              <div className="flex">
                {[...stays, ...stays].map((item, index) => (
                    <div className='w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300 flex flex-col bg-gray-200'>
                      <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-lg'/>
                      <p className="absolute top-2 left-2 text-black text-sm font-semibold mb-2 pl-2 pr-2 bg-white">{item.rating}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">{item.name}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">{item.location}</p>
                      <p className="text-black text-sm font-semibold mb-2 pl-2">Rs. {item.pricePerNight}</p>
                      <div className="flex flex-col items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20 rounded-lg">
                        <button onClick={()=>navigate(`/make-bookings/${item._id}`)} className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-md">Visit Details</button>
                      </div>
                    </div>
        ))}
      </div>
    </div>
    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
  </div>
</div>
    </div>
    </>
  )
}

export default TopDestonations