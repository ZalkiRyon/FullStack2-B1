import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    if (usuarioGuardado) {
      try {
        const usuarioData = JSON.parse(usuarioGuardado);
        setUsuario(usuarioData);
      } catch (error) {
        console.error("Error al cargar sesión:", error);
        localStorage.removeItem("usuarioActivo");
      }
    }
  }, []);

  // Iniciar sesión
  const login = (usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioData));
  };

  // Cerrar sesión
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioActivo");
  };

  const value = {
    usuario,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
