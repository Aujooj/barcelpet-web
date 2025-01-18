import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AuthContextType from "../interfaces/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("loggedUser");
    const storedUserId = localStorage.getItem("loggedUserId");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(storedUser);
    if (storedUserId) setUserId(storedUserId);
  }, []);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) setToken(storedToken);
  }, []);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
  };

  const updateUser = (newUser: string | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("loggedUser", newUser);
    } else {
      localStorage.removeItem("loggedUser");
    }
  };

  const updateUserId = (newUserId: string | null) => {
    setUserId(newUserId);
    if (newUserId) {
      localStorage.setItem("loggedUserId", newUserId);
    } else {
      localStorage.removeItem("loggedUserId");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        userId,
        setToken: updateToken,
        setUser: updateUser,
        setUserId: updateUserId,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
