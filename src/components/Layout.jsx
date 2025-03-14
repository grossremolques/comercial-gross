import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { NavBar } from "./Generales/NavBar";
import { ClientesContextProvider } from "../context/ClientesContext";
import { GestoriaContextProvider } from "../context/GestoriaContext";
import { UnidadesGrossContextProvider } from "../context/UnidadesGrossContext";
import { AtributosProvider } from "../context/Attributes/AtributosContext";
export default function Layout() {
  const { auth, getAuth, getUser, user } = useAuth();
  useEffect(() => {
    getAuth();
  }, []);
  useEffect(() => {
    if (auth) {
      getUser();
    }
  }, [auth]);
  return (
    <>
      {auth && user && (
        <>
          <div className="fixed w-full bg-gray-100">
            <NavBar />
            <div className="mx-auto px-4 sm:px-6 py-20 min-h-screen ">
              <ClientesContextProvider>
                <GestoriaContextProvider>
                  <UnidadesGrossContextProvider>
                    <AtributosProvider>
                      <Outlet />
                    </AtributosProvider>
                  </UnidadesGrossContextProvider>
                </GestoriaContextProvider>
              </ClientesContextProvider>
            </div>
          </div>
          
        </>
      )}
    </>
  );
}
