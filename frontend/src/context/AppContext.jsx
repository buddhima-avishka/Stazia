import { createContext, useEffect, useState } from "react";
import { stays } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [rooms,setRooms] = useState([])

  const getRoomsData = async () => {
    try {

      const {data} = await axios.get(backendUrl + '/api/room/list')
      if (data.success) {
        setRooms(data.rooms)
        
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getRoomsData()
  },[])

  const value = {
    stays,
    rooms,
    backendUrl,
    getRoomsData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider