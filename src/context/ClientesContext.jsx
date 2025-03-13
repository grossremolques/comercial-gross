import { createContext, useContext, useState, useEffect } from "react";
import { ss_clientes } from "../API/backend";
// Hook de filtrado con debounce
function useClientFilter(clientes, search, debounceTime = 300) {
  const [filteredData, setFilteredData] = useState(clientes);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = clientes.filter((item) =>
        item.razon_social.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [search, clientes, debounceTime]);

  return filteredData;
}
const ClientesContext = createContext();
export const useClientes = () => useContext(ClientesContext);
export const ClientesContextProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [client, setClient] = useState({});
  const [search, setSearch] = useState(""); // Estado para el término de búsqueda
  // Obtener datos de clientes
  useEffect(() => {
    getClientes();
  }, []);
  const getClientes = async () => {
    try {
      const res = await ss_clientes.getData();
      setClientes(res);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };
  // Hook de filtrado aplicado al estado `clientes`
  const filteredData = useClientFilter(clientes, search);

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        getClientes,
        client,
        setClient,
        search,
        setSearch,
        filteredData, // Exponer los datos filtrados
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
