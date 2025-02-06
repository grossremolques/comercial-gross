import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { NavBar } from "./NavBar";
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
          <div className="bg-gray-100">
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 min-h-screen">
              <Outlet />
            </div>
            
          </div>
        </>
      )}
    </>
  );
}
