import { createContext, useContext, useEffect, useState } from "react";
import { ss_unidadesGross } from "../API/backend";
import { useGestoria } from "./GestoriaContext";
const UnidadesGrossContext = createContext();
export const useUnidadesGross = () => useContext(UnidadesGrossContext);
export const UnidadesGrossContextProvider = ({ children }) => {
  const [unidadesGross, setUnidadesGross] = useState([]);
  const { gestoria } = useGestoria();
  useEffect(() => {
    if (gestoria.length > 0) {
      getUnidadesGross();
    }
  }, [gestoria]); // Se ejecuta solo cuando `gestoria` tenga datos

  const getUnidadesGross = async () => {
    try {
      const dataUnidades = await ss_unidadesGross.getData();

      dataUnidades.forEach((item) => {
        const unidadGestoria = gestoria.find(
          (unidad) => unidad.trazabilidad === item.trazabilidad
        );
        if (unidadGestoria) {
          item["gestoria"] = unidadGestoria;
        }
      });
      setUnidadesGross(dataUnidades.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <UnidadesGrossContext.Provider value={{ unidadesGross, getUnidadesGross }}>
      {children}
    </UnidadesGrossContext.Provider>
  );
};
