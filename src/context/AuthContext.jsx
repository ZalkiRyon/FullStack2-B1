import { createContext, useContext, useState, useEffect } from "react";
import { authenticate } from "../services/AuthService";

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
  const [loading, setLoading] = useState(true);

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    if (userToken && userData) {
      try {
        const data = JSON.parse(userData);
        setUsuario({ ...data, token: userToken });
      } catch (error) {
        console.error("Error al cargar sesión/token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      const authResponse = await authenticate(email, password);
      const { token, user } = authResponse;

      if (token && user) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));

        setUsuario({ ...user, token: token });
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  };

  // Cerrar sesión
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  const value = {
    usuario,
    login,
    logout,
    isAuthenticated: !!usuario,
    hasRole: (role) =>
      usuario && usuario.rolNombre.toUpperCase() === role.toUpperCase(),
    loading,
  };
  
  if (loading) return <div>Cargando sesión...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
