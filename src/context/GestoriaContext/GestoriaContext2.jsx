import { createContext, useContext, useReducer } from "react";
import { ss_gestoria2 } from "../../API/backend";
import { GestoriaReducer } from "./GestoriaReduce";
const GestoriaGrossContext2 = createContext();
export const useGestoria2 = () => useContext(GestoriaGrossContext2);
export const GestoriaContextProvider2 = ({ children }) => {
  const initialState = {
    gestoria2: [],
  };
  const [state, dispatch] = useReducer(GestoriaReducer, initialState);
  const postGestoria = async ({values, user}) => {
    console.log("Gestoria2", values);
    try {
      const { data, error } = await ss_gestoria2.postData({data:values, user: user});
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return (
    <GestoriaGrossContext2.Provider value={{postGestoria}}>
      {children}
    </GestoriaGrossContext2.Provider>
  );
};
