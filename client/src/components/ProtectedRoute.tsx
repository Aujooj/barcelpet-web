import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import ProviderProps from "../interfaces/AuthProviderProps";

export const ProtectedRoute: React.FC<ProviderProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
};
