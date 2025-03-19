import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Clientes from "./pages/Clientes";

import { PDFCambio } from "./PDF/PDFCambio";
import { PDFProforma } from "./PDF/PDFProforma";
import Gestoria from "./pages/Gestoria/Gestoria";

/* 📂 Proforma */
import { NewProforma } from "./pages/Proforma/NewProforma";
import { ProformaID } from "./pages/Proforma/ProformaID";
import Proformas from "./pages/Proforma/Proformas";
/* 📂 Solicitudes */
import Solicitudes from "./pages/Cambios/Solicitudes";
import { NuevaSolicitud } from "./pages/Cambios/NuevaSolicitud";
import { SolcitudID } from "./pages/Cambios/SolicitudID";
/* 📂 Venta 0 km */
import NuevaVenta from "./pages/UnidadNueva/NuevaVenta";

/* Contextos */
import { AuthContextProvider } from "./context/AuthContext";
import { ModalContextProvider } from "./context/ModalContext";
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
        { path: "/solicitar-cambio", element: <NuevaSolicitud /> },
        { path: "/solicitud/:id", element: <SolcitudID /> },
        { path: "/proforma/:id", element: <ProformaID /> },
        { path: "/new-proforma", element: <NewProforma /> },
        { path: "/pdf-proforma", element: <PDFProforma /> },
        { path: "/clientes", element: <Clientes /> },
        { path: "/gestoria", element: <Gestoria /> },
        { path: "/nueva-venta", element: <NuevaVenta /> },
      ],
    },

    { path: "*", element: <h1>Error</h1> },
  ]);
  return (
    <>
      <AuthContextProvider>
        <ModalContextProvider>
          <RouterProvider router={router} />
        </ModalContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
