import { createContext, useContext, useReducer } from "react";
import { ss_fechas } from "../../API/backend";
import { FechasReducer } from "./FechasReduce";
const FechasContext = createContext();
export const useFechas = () => useContext(FechasContext);
export const FechasContextProvider = ({ children }) => {
  const initialState = {
    fechas: [],
  };
  const [state, dispatch] = useReducer(FechasReducer, initialState);
  const postFechas = async ({values}) => {
    try {
      const { data, error } = await ss_fechas.postData({data:values});
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return (
    <FechasContext.Provider value={{postFechas}}>
      {children}
    </FechasContext.Provider>
  );
};
