import LogoGrossBlanco from "../assets/Logos/LogoGrossBlanco.png";
import { NavLink } from "react-router-dom";
export function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <NavLink
              to="/solicitudes"
              className="text-2xl font-medium"
            >
              <img
                src={LogoGrossBlanco}
                alt="Logo empresa Gross"
                width={"120px"}
              />
            </NavLink>
          </div>
          <div className="hidden md:flex items-center justify-end gap-4 text-gray-300">
            <NavLink
              to="/solicitudes"
              className={({ isActive }) =>
                `px-1.5 rounded ${
                  isActive ? "text-white font-semibold" : "hover:bg-gray-500/50"
                }`
              }
            >
              Solicitudes
            </NavLink>
            <NavLink
              to="/solicitar-cambio"
              className={({ isActive }) =>
                `px-1.5 rounded ${
                  isActive ? "text-white font-semibold" : "hover:bg-gray-500/50"
                }`
              }
            >
              Crear Solicitudes
            </NavLink>
            <NavLink
              to="/proformas"
              className={({ isActive }) =>
                `px-1.5 rounded ${
                  isActive ? "text-white font-semibold" : "hover:bg-gray-500/50"
                }`
              }
            >
              Proformas
            </NavLink>
            <NavLink
              to="/new-proforma"
              className={({ isActive }) =>
                `px-1.5 rounded ${
                  isActive ? "text-white font-semibold" : "hover:bg-gray-500/50"
                }`
              }
            >
              Crear Proforma
            </NavLink>
            <NavLink
              to="/pdf-proforma"
              className={({ isActive }) =>
                `px-1.5 rounded ${
                  isActive ? "text-white font-semibold" : "hover:bg-gray-500/50"
                }`
              }
            >
              PDF
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
