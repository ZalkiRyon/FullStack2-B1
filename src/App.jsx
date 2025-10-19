import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/store/HomePage";
import StoreLayout from "./layouts/StoreLayout";
import CatalogPage from "./pages/store/CatalogPage";
import AboutPage from "./pages/store/AboutPage";
import BlogPage from "./pages/store/BlogPage";
import ContactPage from "./pages/store/ContactPage";
import CartPage from "./pages/store/CartPage";
import LoginPage from "./pages/store/LoginPage";
import RegisterPage from "./pages/store/RegisterPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InventarioPage from "./pages/admin/InventarioPage";
import UserManagement from "./pages/admin/UserManagement";
import NewUser from "./pages/admin/NewUser";
import ConfiguracionesPage from "./pages/admin/ConfiguracionesPage";
import PerfilPage from "./pages/admin/PerfilPage";
import BuscarPage from "./pages/admin/BuscarPage";
import AyudaPage from "./pages/admin/AyudaPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import { initializeDataProductos } from "./utils/dataProductos";
import { initializeDataUsuarios } from "./utils/data";

// Ocuparemos un createBrowserRouter de react-router-dom para mantener un orden dentro del archivo
const router = createBrowserRouter([
  // Rutas de la tienda
  // Se genera layout que mantendra componentes persistentes como navbar
  {
    path: "/",
    element: <StoreLayout />,
    // Todo lo de children es lo que se mostrara denmtro del layout
    children: [
      {
        // Al indicar index true refiere que es la ruta principal "/"
        index: true,
        element: <HomePage />,
      },
      {
        path: "productos",
        element: <CatalogPage />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
      {
        path: "blogs",
        element: <BlogPage />,
      },
      {
        path: "contacto",
        element: <ContactPage />,
      },
      {
        path: "carrito",
        element: <CartPage />,
      },
      {
        path: "inicio-sesion",
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <RegisterPage />,
      },
    ],
  },
  // Rutas del admin
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "inventario",
        element: <InventarioPage />,
      },
      {
        path: "usuarios",
        element: <UserManagement />,
      },
      {
        path: "nuevo-usuario",
        element: <NewUser />,
      },
      {
        path: "configuraciones",
        element: <ConfiguracionesPage />,
      },
      {
        path: "perfil",
        element: <PerfilPage />,
      },
      {
        path: "buscar",
        element: <BuscarPage />,
      },
      {
        path: "ayuda",
        element: <AyudaPage />,
      },
    ],
  },
  // Para errores de ruta
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  useEffect(() => {
    initializeDataProductos();
    initializeDataUsuarios();
  }, [])
  
  return <RouterProvider router={router} />;
}

export default App;
