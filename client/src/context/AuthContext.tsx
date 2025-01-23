import React, { createContext, useContext, useState, useEffect } from "react";
import AuthContextType from "../interfaces/AuthContextType";
import User from "../interfaces/User";
import CryptoJS from "crypto-js";
import ProviderProps from "../interfaces/AuthProviderProps";

const ENCRYPTION_KEY =
  "emfi*pbvY93c$aQMQBAMs@uS8#KjdFx#jNYk#euvSTSrgXW$A8B3j7%E6Q3^AnQ^w!*qTMA5fq%nbQ3HA4&EKLA^FPCfyjY@Mtx6";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const encryptedUser = localStorage.getItem("loggedUser");

    if (storedToken) setTokenState(storedToken);
    if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, ENCRYPTION_KEY);
        const decryptedUser = JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        ) as User;
        setUserState(decryptedUser);
      } catch (e) {
        console.error("Failed to decrypt user data", e);
      }
    }
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      try {
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(newUser),
          ENCRYPTION_KEY
        ).toString();
        localStorage.setItem("loggedUser", encryptedUser);
      } catch (e) {
        console.error("Failed to encrypt user data", e);
      }
    } else {
      localStorage.removeItem("loggedUser");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedUser");
    setTokenState(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setToken,
        setUser,
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
