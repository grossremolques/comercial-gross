import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { SolicitudCambio } from "./pages/SolicitudCambio";
import { ModalContextProvider } from "./context/ModalContext";
import { PDF } from "./components/PDF";
import Solicitudes from "./pages/Solicitudes";
import { SolcitudID } from "./pages/SolicitudID";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <h1>Home</h1> },
        { path: "/pdf", element: <PDF data={{}}/> },
        { path: "/solicitudes", element: <Solicitudes /> },
        { path: "/solicitar-cambio", element: <SolicitudCambio /> },
        { path: "/solicitud/:id", element: <SolcitudID /> },
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
