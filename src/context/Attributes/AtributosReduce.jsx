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
  GET_ARCOS,
  GET_MATERIAL,
  GET_COLORES,
  GET_CAJONES,
  GET_PORTA_AUXILIO,
  GET_OJALES,
  GET_PESO_BRUTO,
  GET_TRABAJO_PLATO,
  GET_CABEZAL,
  GET_MEDIDA_LLANTA,
  SET_ALL_ATRIBUTES,
  GET_UBICACIONES,
  GET_ATRIBUTOS
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
    case GET_MATERIAL:
      return {...state, materiales: payload };
    case GET_COLORES:
      return {...state, colores: payload };
    case GET_CAJONES:
      return {...state, cajones: payload };
    case GET_PORTA_AUXILIO:
      return {...state, porta_auxilio: payload };
    case GET_OJALES:
      return {...state, ojales: payload };
    case GET_PESO_BRUTO:
      return {...state, peso_bruto: payload };
    case GET_TRABAJO_PLATO:
      return {...state, trabajo_plato: payload };
    case GET_CABEZAL:
      return {...state, cabezal: payload };
    case GET_MEDIDA_LLANTA:
      return {...state, medida_llantas: payload };
    case SET_ALL_ATRIBUTES:
      return {...state, allAtributes: payload };
    case GET_UBICACIONES:
      return {...state, ubicaciones: payload };
    case GET_ATRIBUTOS:
      return {...state, atributos: payload };
    default:
      return state;
  }
};
