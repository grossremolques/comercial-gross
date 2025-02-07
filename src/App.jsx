import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { SolicitudCambio } from "./pages/SolicitudCambio";
import { ModalContextProvider } from "./context/ModalContext";
import { PDFCambio } from "./components/PDFCambio";
import Solicitudes from "./pages/Solicitudes";
import { SolcitudID } from "./pages/SolicitudID";
import { AtributosProvider } from "./context/Attributes/AtributosContext";
import { PDFProforma } from "./PDF/PDFProforma";

import { ClientesContextProvider } from "./context/ClientesContext";

/* 📂 Proforma */
import { NewProforma } from "./pages/Proforma/NewProforma";
import Proformas from "./pages/Proforma/Proformas";
import { ProformaID } from "./pages/Proforma/ProformaID";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <h1>Home</h1> },
        { path: "/pdf-cambio", element: <PDFCambio /> },
        { path: "/solicitudes", element: <Solicitudes /> },
        { path: "/proformas", element: <Proformas /> },
        { path: "/solicitar-cambio", element: <SolicitudCambio /> },
        { path: "/solicitud/:id", element: <SolcitudID /> },
        { path: "/proforma/:id", element: <ProformaID /> },
        {
          path: "/new-proforma",
          element: <NewProforma />,
        },
        { path: "/pdf-proforma", element: <PDFProforma /> },
      ],
    },

    { path: "*", element: <h1>Error</h1> },
  ]);
  return (
    <>
      <AuthContextProvider>
        <ClientesContextProvider>
          <ModalContextProvider>
            <AtributosProvider>
              <RouterProvider router={router} />
            </AtributosProvider>
          </ModalContextProvider>
        </ClientesContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
