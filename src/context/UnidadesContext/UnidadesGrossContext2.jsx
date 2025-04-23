import { createContext, useContext, useReducer, useEffect } from "react";
import { ss_unidadesGross2 } from "../../API/backend";
import { UnidadesReducer } from "./UnidadesReduce";
const UnidadesGrossContext2 = createContext();
export const useUnidadesGross2 = () => useContext(UnidadesGrossContext2);
export const UnidadesGrossContextProvider2 = ({ children }) => {
  const initialState = {
    unidadesGross2: [],
  };
  const [state, dispatch] = useReducer(UnidadesReducer, initialState);
  const getUnidadesGross = async () => {
    try {
      const unidades = await ss_unidadesGross2.getData();
      dispatch({
        type: "GET_UNIDADES",
        payload: unidades,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const postUnidades = async ({ values, user }) => {
    try {
      const { data, error } = await ss_unidadesGross2.postData({
        data: values,
        user: user,
      });
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e };
    }
  };
  const createId = async (tipo) => {
    const Today = new Date();
    let num; //Número inicial de la trazabilidad
    let year = Today.getFullYear().toString().substr(2, 2);
    switch (tipo) {
      case "Acoplado":
        num = "1";
        break;
      case "Carrocería":
        num = "2";
        break;
      case "Semirremolque":
        num = "3";
        break;
      case "Implemento agricola":
        num = "8";
        break;
    }
    if (state.unidadesGross2.length > 0) {
      try {
        let ID;
        let IDs = state.unidadesGross2.filter(
          (item) =>
            item.trazabilidad &&
            item.trazabilidad.toString().startsWith(num) &&
            item.trazabilidad.toString().endsWith(year)
        )
        IDs = IDs.map((item) => item.trazabilidad.toString().substr(1, 4));
        if (IDs.length < 1) ID = 1;
        else ID = Math.max(...IDs) + 1;
        ID = String(ID).padStart(4, "0");
        let trazabilidad = Number(`${num}${ID}${year}`);
        return { success: true, trazabilidad };
      } catch (e) {
        return { success: false, error: e };
      }
    }
  };
  useEffect(() => {
    getUnidadesGross();
  }, []);
  return (
    <UnidadesGrossContext2.Provider
      value={{
        postUnidades,
        getUnidadesGross,
        createId,
        unidadesGross2: state.unidadesGross2,
      }}
    >
      {children}
    </UnidadesGrossContext2.Provider>
  );
};
