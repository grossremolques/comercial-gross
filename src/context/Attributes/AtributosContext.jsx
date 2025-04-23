import { createContext, useContext, useEffect, useReducer } from "react";
import { AtributosReducer } from "./AtributosReduce";
import {
  ss_atributos,
  ss_modelos,
} from "../../API/backend";

const AtributosContext = createContext();
export const useAtributos = () => useContext(AtributosContext);

export function AtributosProvider({ children }) {
  const initialState = {
    atributos: [],
    modelos: [],
  };
  const [state, dispatch] = useReducer(AtributosReducer, initialState);
  const getAtributos = async () => {
    try {
      const data = await ss_atributos.getData();
      dispatch({
        type: "GET_ATRIBUTOS",
        payload: data.filter((item) => item.atributo),
      });
    } catch (err) {
      console.error("Error", err);
      return "fail";
    }
  };
  const getModelos = async () => {
    try {
      const data = await ss_modelos.getData();
      let arr = [];
      for (let item of data) {
        let obj = {};
        let isInArr = arr.some((elem) => elem.modelo.value === item.modelo);
        if (!isInArr) {
          obj["modelo"] = { value: item.modelo };
          data.map((item) => {
            if (obj.modelo.value == item.modelo) {
              obj[item.atributo] = {
                value: item.default_value,
                type: item.type,
                isInProforma: item.proforma,
                clasification: item.clasificacion,
              };
            }
          });
          arr.push(obj);
        }
      }
      dispatch({ type: "GET_MODELOS", payload: arr });
      const result = data.error ? "fail" : "success";
      return result;
    } catch (err) {
      console.error("Error", err);
      return "fail";
    }
  };

  useEffect(() => {
    getModelos(), getAtributos();
  }, []);
  return (
    <AtributosContext.Provider
      value={{
        modelos: state.modelos,
        atributos: state.atributos,
      }}
    >
      {children}
    </AtributosContext.Provider>
  );
}
