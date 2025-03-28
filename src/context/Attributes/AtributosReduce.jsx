import {
  GET_PUERTAS_TRASERAS,
  GET_MODELOS,
  GET_CAPACIDAD,
  GET_PISO,
  GET_CUMBRERA,
  GET_CILINDRO,
  GET_MECANISMO,
  GET_FORMA_PAGO,
  GET_MEDIOS_PAGO,
  GET_ARCOS
} from "../types";

export const AtributosReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PUERTAS_TRASERAS:
      return { ...state, puertasTraseras: payload };
    case GET_MODELOS:
      return { ...state, modelos: payload };
    case GET_CAPACIDAD:
      return { ...state, capacidad: payload };
    case GET_PISO:
      return { ...state, piso: payload };
    case GET_CUMBRERA:
      return { ...state, cumbrera: payload };
    case GET_CILINDRO:
      return { ...state, cilindro: payload };
    case GET_MECANISMO:
      return { ...state, mecanismo: payload };
    case GET_FORMA_PAGO:
      return { ...state, formaPago: payload };
    case GET_MEDIOS_PAGO:
      return {...state, mediosPago: payload };
    case GET_ARCOS:
      return {...state, arcos: payload };
    default:
      return state;
  }
};
