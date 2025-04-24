import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { NavBar } from "./Generales/NavBar";
import { ClientesContextProvider } from "../context/ClientesContext";
import { GestoriaContextProvider } from "../context/GestoriaContext";
import { UnidadesGrossContextProvider } from "../context/UnidadesGrossContext";
import { AtributosProvider } from "../context/Attributes/AtributosContext";
import { CamionesContextProvider } from "../context/CamionesContext";
import { UnidadesGrossContextProvider2 } from "../context/UnidadesContext/UnidadesGrossContext2";
import { GestoriaContextProvider2 } from "../context/GestoriaContext/GestoriaContext2";
import { FechasContextProvider } from "../context/FechasContext/FechasContext";
export default function Layout() {
  const { auth, getAuth, getUser, user } = useAuth();
  useEffect(() => {
    getAuth();
  }, []);
  useEffect(() => {
    if (auth) getUser();
  }, [auth]);
  return (
    <>
      {auth && user && (
        <>
          <div className="fixed w-full bg-gray-100">
            <NavBar />
            <div className="mx-auto px-4 sm:px-6 py-16 min-h-screen">
              <ClientesContextProvider>
                <CamionesContextProvider>
                  <GestoriaContextProvider2>
                    <GestoriaContextProvider>
                      <FechasContextProvider>
                        <UnidadesGrossContextProvider2>
                          <UnidadesGrossContextProvider>
                            <AtributosProvider>
                              <Outlet />
                            </AtributosProvider>
                          </UnidadesGrossContextProvider>
                        </UnidadesGrossContextProvider2>
                      </FechasContextProvider>
                    </GestoriaContextProvider>
                  </GestoriaContextProvider2>
                </CamionesContextProvider>
              </ClientesContextProvider>
              
            </div>
            
          </div>
        </>
      )}
    </>
  );
}
