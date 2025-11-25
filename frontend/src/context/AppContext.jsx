import { createContext, useEffect, useState } from "react";
import { stays } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [rooms,setRooms] = useState([])
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData,setUserData] = useState(false)

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

  const loadUserProfileData = async () => {
    try {
      
      const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
      if (data.success) {
        setUserData(data.userData)
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

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }

  },[token])

  const value = {
    stays,getRoomsData,
    rooms,
    backendUrl,
    getRoomsData,
    token,setToken,
    userData,setUserData,
    loadUserProfileData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider