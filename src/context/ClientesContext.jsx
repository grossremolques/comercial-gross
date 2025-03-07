import { createContext, useContext, useState, useEffect } from "react";
import { ss_clientes } from "../API/backend";
const ClientesContext = createContext();
export const useClientes = () => useContext(ClientesContext);
export const ClientesContextProvider = ({children}) => {
    const [clientes, setClientes] = useState([]);
    const [client, setClient] = useState([]);
    useEffect(() => {
        getClientes();
      }, []);
    const getClientes = async () => {
        const res = await ss_clientes.getData();
        setClientes(res);
      };

    return (
        <ClientesContext.Provider value={{clientes, getClientes, client, setClient}}>
            {children}
        </ClientesContext.Provider>
    )
}