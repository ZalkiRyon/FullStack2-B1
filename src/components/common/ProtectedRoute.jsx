import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, hasRole, loading, usuario } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated || !usuario) {
    return <Navigate to="/inicio-sesion" replace />;
  }
  // verificar autenticado
  if (!isAuthenticated) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    const userRole = usuario.rolNombre.toUpperCase();
    let redirectPath = "/";

    if (userRole === "ADMIN") {
      redirectPath = "/admin";
    } else if (userRole === "VENDEDOR") {
      redirectPath = "/vendedor";
    }

    if (window.location.pathname.startsWith(redirectPath)) {
      return <Navigate to="/" replace />;
    }

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
