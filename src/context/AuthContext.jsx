import { createContext, useContext, useState } from "react";
import Auth from "auth-google-grossremolques";
import GoogleSheet from "google-sheet-package"
import Email from "gmail-package";
const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
    const ss_empleados = new GoogleSheet({
        sheetId: import.meta.env.VITE_SS_EMPLEADOS,
        rowHead: 1,
        nameSheet: "Registro",
      });
    const authGoogle = async () => {
        const auth = await Auth(apiKey, clientId);
        return auth;
      };
      const [auth, setAuth] = useState(null);
      const [user, setUser] = useState(null);
      const getAuth = async () => {
        const getAuth = await authGoogle();
        setAuth(getAuth);
      };
      const getUser = async () => {
        console.log('getUser');
        try {
          const emailAddress = await Email.getEmail();
          console.log(emailAddress);
          try {
            const empleado = await ss_empleados.getDataById('email_empresa', emailAddress)
            setUser(empleado);
          }
          catch (e) {
            console.log(e);
          }
        }
        catch (e) {
          console.log(e);
        }
        
      }
    return (
        <AuthContext.Provider value={{ auth, getAuth, getUser, user }}>
            {children}
        </AuthContext.Provider>
    )
}