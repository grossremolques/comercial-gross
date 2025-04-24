import { GET_MODELOS, GET_ATRIBUTOS } from "../types";

export const AtributosReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MODELOS:
      return { ...state, modelos: payload };

    case GET_ATRIBUTOS:
      return { ...state, atributos: payload };
    default:
      return state;
  }
};
