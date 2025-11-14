import { createContext } from "react";

export const HotelContext = createContext()

const HotelContextProvider = (props) => {

  const value = {
    
  }

  return (
    <HotelContext.Provider value={value}>
      {props.children}
    </HotelContext.Provider>
  )
}

export default HotelContextProvider