import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { SolicitudCambio } from "./pages/SolicitudCambio";
import { ModalContextProvider } from "./context/ModalContext";
import { PDFCambio } from "./components/PDFCambio";
import Solicitudes from "./pages/Solicitudes";
import { SolcitudID } from "./pages/SolicitudID";
import Proforma from "./pages/Proforma";
import { AtributosProvider } from "./context/Attributes/AtributosContext";
import { PDFProforma } from "./PDF/PDFProforma";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <h1>Home</h1> },
        { path: "/pdf-cambio", element: <PDFCambio/> },
        { path: "/solicitudes", element: <Solicitudes /> },
        { path: "/solicitar-cambio", element: <SolicitudCambio /> },
        { path: "/solicitud/:id", element: <SolcitudID /> },
        {
          path: "/proforma",
          element: <Proforma />,
        },
        { path: "/pdf-proforma", element: <PDFProforma/> },
      ],
    },
    
    { path: "*", element: <h1>Error</h1> },
  ]);
  return (
    <>
      <AuthContextProvider>
        <ModalContextProvider>
          <AtributosProvider>
            <RouterProvider router={router} />
          </AtributosProvider>
        </ModalContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
