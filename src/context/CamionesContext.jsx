import { createContext, useContext, useState, useEffect } from "react";
import { ss_camiones } from "../API/backend";
import { useClientes } from "./ClientesContext";
import { use } from "react";
// Hook de filtrado con debounce
function useCamionFilter(camiones, search, debounceTime = 300) {
  const [filteredData, setFilteredData] = useState(camiones);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = camiones.filter((item) =>
        item.trazabilidad
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setFilteredData(result.reverse());
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [search, camiones, debounceTime]);

  return filteredData;
}
const CamionesContext = createContext();
export const useCamiones = () => useContext(CamionesContext);
export const CamionesContextProvider = ({ children }) => {
  const { clientes, getClientes } = useClientes(); // Consumir el contexto de clientes
  const [camiones, setCamiones] = useState([]);
  const [camion, setCamion] = useState({});
  const [search, setSearch] = useState(""); // Estado para el término de búsqueda
  // Obtener datos de camiones
  useEffect(() => {
    getClientes();
  }, []);
  useEffect(() => {
    if (clientes.length > 0) {
      getCamiones();
    }
  }, [clientes]); // Se ejecuta solo cuando `clientes` tenga datos
  const getCamiones = async () => {
    try {
      const res = await ss_camiones.getData();
      if (res.length > 0) {
        res.forEach((item) => {
          const cliente = clientes.find(
            (cliente) => cliente.id === item.id_cliente
          );
          if (cliente) {
            item["razon_social"] = cliente.razon_social;
          }
        });
        setCamiones(res);
      }
    } catch (error) {
      console.error("Error al obtener camiones:", error);
    }
  };
  // Hook de filtrado aplicado al estado `camiones`
  const filteredData = useCamionFilter(camiones, search);

  return (
    <CamionesContext.Provider
      value={{
        camiones,
        getCamiones,
        camion,
        setCamion,
        search,
        setSearch,
        filteredData, // Exponer los datos filtrados
      }}
    >
      {children}
    </CamionesContext.Provider>
  );
};
