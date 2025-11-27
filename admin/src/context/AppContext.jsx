import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  const getAllBookings = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/all-bookings',
        {},
        { headers: { aToken } }
      )

      if (data.success) {
        setBookings(data.bookings)
        return data.bookings
      } else {
        toast.error(data.message)
        return []
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      return []
    }
  }

  // Cancel appointment
  const cancelAppointment = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/cancel-appointment',
        { bookingId },
        { headers: { aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        getAllBookings() // Refresh bookings list
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    bookings,
    setBookings,
    getAllBookings,
    cancelAppointment
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider