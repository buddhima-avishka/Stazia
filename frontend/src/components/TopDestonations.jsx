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

    <div className='flex flex-col items-center py-10' id='topDestinations'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl text-gray-500 pb-5 font-semibold leading-tight md:leading-tight lg:leading-tight'>Top Destinations</h1>
      <p className='text-sm md:text-base text-gray-500 pb-5 text-center px-4'>Discover our handpicked selection of exceptional properties around the <br className="hidden md:block" /> world, offering unparalleled luxury and unforgettable experiences.</p>
      
      <div className="w-full overflow-hidden relative" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        
        <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: stays.length * 2500 + "ms" }}>
          <div className="flex">
            {[...stays, ...stays].map((item, index) => (
              <div key={index} className='w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300 rounded-lg overflow-hidden bg-gray-200'>
                <img src={item.image} alt={item.name} className='w-full h-full object-cover'/>
                <p className="absolute top-2 left-2 text-black text-sm font-semibold px-2 py-1 bg-white rounded">{item.rating}</p>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-semibold">{item.name}</p>
                  <p className="text-white text-xs">{item.location}</p>
                  <p className="text-white text-sm font-bold">Rs. {item.pricePerNight}</p>
                </div>
                <div className="flex flex-col items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0 backdrop-blur-md bg-black/20">
                  <button onClick={()=>navigate(`/MakeBookings/${item._id}`)} className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-md">Visit Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
    </>
  )
}

export default TopDestonations