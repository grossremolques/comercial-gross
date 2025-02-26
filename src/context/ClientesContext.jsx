import { createContext, useContext, useState, useEffect } from "react";
import { ss_clientes } from "../API/backend";
const ClientesContext = createContext();
export const useClientes = () => useContext(ClientesContext);
export const ClientesContextProvider = ({children}) => {
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        getClientes();
      }, []);
    const getClientes = async () => {
        const res = await ss_clientes.getData();
        setClientes(res);
      };
    return (
        <ClientesContext.Provider value={{clientes, getClientes}}>
            {children}
        </ClientesContext.Provider>
    )
}