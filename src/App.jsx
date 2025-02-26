import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";

import { PDFCambio } from "./PDF/PDFCambio";
import { PDFProforma } from "./PDF/PDFProforma";

/* 📂 Proforma */
import { NewProforma } from "./pages/Proforma/NewProforma";
import { ProformaID } from "./pages/Proforma/ProformaID";
import Proformas from "./pages/Proforma/Proformas";
/* 📂 Solicitudes */
import Solicitudes from "./pages/Cambios/Solicitudes";
import { NuevaSolicitud } from "./pages/Cambios/NuevaSolicitud";
import { SolcitudID } from "./pages/Cambios/SolicitudID";
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
