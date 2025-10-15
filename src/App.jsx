import React from "react";
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
import NotFoundPage from "./pages/common/NotFoundPage";

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
    ],
  },
  // Para errores de ruta
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
