import { createContext, useContext, useEffect, useReducer } from "react";
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
  ss_medio_pago,
  ss_arcos,
  ss_material,
  ss_colores,
  ss_cajones,
  ss_portaAuxilio,
  ss_ojal,
  ss_peso_bruto,
  ss_trabajo_plato,
  ss_cabezal,
  ss_medida_llantas,
  ss_ubicacion
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
    arcos:[],
    materiales:[],
    colores: [],
    cajones: [],
    porta_auxilio: [],
    ojales: [],
    peso_bruto: [],
    trabajo_plato: [],
    cabezal: [],
    medida_llantas: [],
    allAtributes: false,
    ubicaciones: []
  };
  const [state, dispatch] = useReducer(AtributosReducer, initialState);
  const getPuertasTraseras = async () => {
    try {
      const data = await ss_puerta_trasera.getData();
      dispatch({ type: "GET_PUERTAS_TRASERAS", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getCapacidad = async () => {
    try {
      const data = await ss_capacidad.getData();
      dispatch({ type: "GET_CAPACIDAD", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
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
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getPiso = async () => {
    try {
      const data = await ss_piso.getData();
      dispatch({ type: "GET_PISO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getCumbrera = async () => {
    try {
      const data = await ss_cumbrera.getData();
      dispatch({ type: "GET_CUMBRERA", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getMecanismo = async () => {
    try {
      const data = await ss_mecanismo.getData();
      dispatch({ type: "GET_MECANISMO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getCilindro = async () => {
    try {
      const data = await ss_cilindro.getData();
      dispatch({ type: "GET_CILINDRO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getFormaPago = async () => {
    try {
      const data = await ss_forma_pago.getData();
      dispatch({ type: "GET_FORMA_PAGO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getMedioPago = async () => {
    try {
      const data = await ss_medio_pago.getData();
      dispatch({ type: "GET_MEDIOS_PAGO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getArcos = async () => {
    try {
      const data = await ss_arcos.getData();
      dispatch({ type: "GET_ARCOS", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getMaterial = async () => {
    try {
      const data = await ss_material.getData();
      dispatch({ type: "GET_MATERIAL", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getColores = async () => {
    try {
      const data = await ss_colores.getData();
      dispatch({ type: "GET_COLORES", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getCajones = async () => {
    try {
      const data = await ss_cajones.getData();
      dispatch({ type: "GET_CAJONES", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getPortaAuxilio = async () => {
    try {
      const data = await ss_portaAuxilio.getData();
      dispatch({ type: "GET_PORTA_AUXILIO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getOjales = async () => {
    try {
      const data = await ss_ojal.getData();
      dispatch({ type: "GET_OJALES", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getPesoBruto = async () => {
    try {
      const data = await ss_peso_bruto.getData();
      dispatch({ type: "GET_PESO_BRUTO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  };
  const getTrabajoPlato = async () => {
    try {
      const data = await ss_trabajo_plato.getData();
      dispatch({ type: "GET_TRABAJO_PLATO", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  }
  const getCabezal = async () => {
    try {
      const data = await ss_cabezal.getData();
      dispatch({ type: "GET_CABEZAL", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  }
  const getMedidaLlantas = async () => {
    try {
      const data = await ss_medida_llantas.getData();
      dispatch({ type: "GET_MEDIDA_LLANTA", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  }
  const getUbicaciones = async () => {
    try {
      const data = await ss_ubicacion.getData();
      dispatch({ type: "GET_UBICACIONES", payload: data });
      const result = data.error ? 'fail': 'success';
      return result
    } catch (err) {
      console.error("Error",err);
      return 'fail'
    }
  }
  const getAllAtributes = async () => {
    const results  = await Promise.all([
      getPuertasTraseras(),
      getCapacidad(),
      getModelos(),
      getPiso(),
      getCumbrera(),
      getMecanismo(),
      getCilindro(),
      getFormaPago(),
      getMedioPago(),
      getArcos(),
      getMaterial(),
      getColores(),
      getCajones(),
      getPortaAuxilio(),
      getOjales(),
      getPesoBruto(),
      getTrabajoPlato(),
      getCabezal(),
      getMedidaLlantas(),
      getUbicaciones()
    ])
    const allSuccess = results.every(res => res === 'success');
    if (!allSuccess) {
      console.error("Algunas cargas de atributos fallaron", results);
    }
    dispatch({ type: "SET_ALL_ATRIBUTES", payload: allSuccess });
  }
  
  return (
    <AtributosContext.Provider
      value={{
        puertasTraseras: state.puertasTraseras,
        modelos: state.modelos,
        capacidad: state.capacidad,
        piso: state.piso,
        cumbrera: state.cumbrera,
        mecanismo: state.mecanismo,
        cilindro: state.cilindro,
        formaPago: state.formaPago,
        mediosPago: state.mediosPago,
        arcos: state.arcos,
        materiales: state.materiales,
        colores: state.colores,
        cajones: state.cajones,
        porta_auxilio: state.porta_auxilio,
        ojales: state.ojales,
        peso_bruto: state.peso_bruto,
        trabajo_plato: state.trabajo_plato,
        cabezal: state.cabezal,
        medida_llantas: state.medida_llantas,
        allAtributes: state.allAtributes,
        ubicaciones: state.ubicaciones,
        getAllAtributes,
        getFormaPago,
        getMedioPago,
        getModelos,
      }}
    >
      {children}
    </AtributosContext.Provider>
  );
}
