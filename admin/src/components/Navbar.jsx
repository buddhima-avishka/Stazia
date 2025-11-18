import React from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const {aToken,setAToken} = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div>
      <nav class="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
        
    <div className='flex items-center text-xs'>
      <img src={assets.logo} alt="" className={`h-12 `}/>
      <p className='border rounded-full border-gray-500 px-2.5 py-0.5'>{aToken ? 'Admin' : 'Doctor'}</p>
    </div>


    <button onClick={logout} type="button" className="text-white md:inline hidden text-sm hover:opacity-90 active:scale-95 transition-all px-8 py-2 rounded-full" style={{backgroundColor: '#C49C74'}}>
        Logout
    </button>

    <button aria-label="menu-btn" type="button" class="menu-btn inline-block md:hidden active:scale-90 transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#000">
            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
        </svg>
    </button>

    {/* <div class="mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 hidden md:hidden">

        <button type="button" class="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full">
            Get started
        </button>
    </div> */}
</nav>
    </div>
  )
}

export default Navbar