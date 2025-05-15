// KOMENTARI DA MOZES BEZ BACKENDA RADIT

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { apiCall } from "@/api";

interface MyJwtPayload {
  id: number;
  email: string;
  exp: number;
}

export interface User {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  country: string;
  joinDate: string;
  team: string;
  league: string;
  dartsName: string;
  dartsWeight: number;
  profileImgURL: string;
}

interface Auth {
  token: string;
  user: User | null;
  logout: () => void;
  refresh: (arg:any) => void,
}

// sve sto stavljas u kontekst
// sto zelis dati komponentama
const AuthContext = createContext<Auth>({
  token: "",
  user: null,
  logout: () => {},
  refresh: () => {},
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
      const decoded = jwtDecode<MyJwtPayload>(newToken);
      const now = Date.now() / 1000;

      if (decoded.exp != undefined && decoded.exp < now) {
        logout(); // token istekao
      }
      setToken(newToken);

      getUser(decoded);
    }
  }, []);

  const getUser = (decoded : any) => {
    apiCall(`/user/${decoded.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(([data, status]) => {
        if (status === 200) {
          setUser(data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });      
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, logout, refresh:getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// useContext() vraca vrijednosti zadanog konteksta koje nam pruza njegov provider
export const useAuth = () => useContext(AuthContext);
