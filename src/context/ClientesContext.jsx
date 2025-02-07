import { createContext, useContext, useState } from "react";
import { ss_clientes } from "../API/backend";
const ClientesContext = createContext();
export const useClientes = () => useContext(ClientesContext);
export const ClientesContextProvider = ({children}) => {
    const [clientes, setClientes] = useState([]);
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