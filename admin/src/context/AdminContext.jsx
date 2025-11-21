import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken'): '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  

  // const changeAvailability = async (roomID) => {
  //   try {

  //     const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {roomID}, {headers:{aToken}})

  //     if (data.success) {
  //       toast.success(data.message)
  //       fetchRooms()
        
  //     } else {
  //       toast.error(data.message)
  //     }
      
  //   } catch (error) {
  //      toast.error(error.message)
  //   }

  // }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    // changeAvailability
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;