import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
}

interface Auth {
  token: string;
  user: User | null;
  logout: () => void;
}

// sve sto stavljas u kontekst
// sto zelis dati komponentama
const AuthContext = createContext<Auth>({
  token: "",
  user: null,
  logout: () => {},
});

// provider nad nasim kontekstom, on provide-a komponente koje su u njemu sa podacima
// koje cuva kontekst nad kojim je provider zadan
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const newToken = localStorage.getItem("token");
    if (!newToken) {
      logout();
    } else {

      const decoded = jwtDecode(newToken);
      const now = Date.now() / 1000;

      if (decoded.exp != undefined && decoded.exp < now) {
        logout(); // token istekao
      }

      setToken(newToken);
    }

  }, []);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useContext() vraca vrijednosti zadanog konteksta koje nam pruza njegov provider
export const useAuth = () => useContext(AuthContext);