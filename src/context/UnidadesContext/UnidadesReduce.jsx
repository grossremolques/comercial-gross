import { GET_UNIDADES } from "../types";

export const UnidadesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_UNIDADES:
      return { ...state, unidadesGross2: payload };
    default:
      return state;
  }
};
