import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
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
          <div className="bg-gray-100 h-screen px-4 py-6">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
}
