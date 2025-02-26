import { createContext, useContext, useReducer } from "react";
import { AtributosReducer } from "./AtributosReduce";
import {
  ss_modelos,
  ss_puerta_trasera,
  ss_capacidad,
  ss_piso,
  ss_cumbrera,
  ss_mecanismo,
  ss_cilindro,
  ss_forma_pago,
  ss_medio_pago
} from "../../API/backend";

const AtributosContext = createContext();
export const useAtributos = () => useContext(AtributosContext);

export function AtributosProvider({ children }) {
  const initialState = {
    puertasTraseras: [],
    modelos: [],
    capacidad: [],
    piso: [],
    cumbrera: [],
    mecanismo: [],
    cilindro: [],
    formaPago: [],
    mediosPago: [],
  };
  const [state, dispatch] = useReducer(AtributosReducer, initialState);
  const getPuertasTraseras = async () => {
    try {
      const data = await ss_puerta_trasera.getData();
      dispatch({ type: "GET_PUERTAS_TRASERAS", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
  const getCapacidad = async () => {
    try {
      const data = await ss_capacidad.getData();
      dispatch({ type: "GET_CAPACIDAD", payload: data });
    } catch (err) {
      console.error(err);
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
                clasification: item.clasificacion
              };
            }
          });
          arr.push(obj);
        }
      }
      dispatch({ type: "GET_MODELOS", payload: arr });
    } catch (err) {
      console.error(err);
    }
  };
  const getPiso = async () => {
    try {
      const data = await ss_piso.getData();
      dispatch({ type: "GET_PISO", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
  const getCumbrera = async () => {
    try {
      const data = await ss_cumbrera.getData();
      dispatch({ type: "GET_CUMBRERA", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
  const getMecanismo = async () => {
    try {
      const data = await ss_mecanismo.getData();
      dispatch({ type: "GET_MECANISMO", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
  const getCilindro = async () => {
    try {
      const data = await ss_cilindro.getData();
      dispatch({ type: "GET_CILINDRO", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
  const getFormaPago = async () => {
    try {
      const data = await ss_forma_pago.getData();
      dispatch({ type: "GET_FORMA_PAGO", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
  const getMedioPago = async () => {
    try {
      const data = await ss_medio_pago.getData();
      dispatch({ type: "GET_MEDIOS_PAGO", payload: data });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AtributosContext.Provider
      value={{
        getPuertasTraseras,
        puertasTraseras: state.puertasTraseras,
        getModelos,
        modelos: state.modelos,
        getCapacidad,
        capacidad: state.capacidad,
        getPiso,
        piso: state.piso,
        getCumbrera,
        cumbrera: state.cumbrera,
        getMecanismo,
        mecanismo: state.mecanismo,
        getCilindro,
        cilindro: state.cilindro,
        getFormaPago,
        formaPago: state.formaPago,
        getMedioPago,
        mediosPago: state.mediosPago,
      }}
    >
      {children}
    </AtributosContext.Provider>
  );
}
