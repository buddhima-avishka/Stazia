import { useState } from "react";
import { createContext } from "react";

export const HotelContext = createContext()

const HotelContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [hToken, setHToken] = useState(localStorage.getItem('hToken') ? localStorage.getItem('hToken'): '')

  const value = {
    hToken,setHToken,
    backendUrl
  }

  return (
    <HotelContext.Provider value={value}>
      {props.children}
    </HotelContext.Provider>
  )
}

export default HotelContextProvider