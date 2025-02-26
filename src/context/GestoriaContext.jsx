import { createContext, useContext, useEffect, useState } from "react";
import { ss_gestoria } from "../API/backend";
import { useClientes } from "./ClientesContext";
const GestoriaContext = createContext();
export const useGestoria = () => useContext(GestoriaContext);
export const GestoriaContextProvider = ({ children }) => {
  const { clientes, getClientes } = useClientes();
  const [gestoria, setGestoria] = useState([]);
  useEffect(() => {
    if (clientes.length > 0) {
      getGestoria();
    }
  }, [clientes]); // Se ejecuta solo cuando `clientes` tenga datos

  const getGestoria = async () => {
    try {
      const dataGestoria = await ss_gestoria.getData();

      dataGestoria.forEach((unidad) => {
        const cliente = clientes.find((c) => c.id === unidad.id_cliente);
        if (cliente) {
          unidad["selectedCliente"] = cliente;
        }
      });

      setGestoria(dataGestoria);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <GestoriaContext.Provider value={{ gestoria, getGestoria }}>
      {children}
    </GestoriaContext.Provider>
  );
};
