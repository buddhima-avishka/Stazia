import { createContext } from "react";
import { stays } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const value = {
    stays
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider