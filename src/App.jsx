import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/store/HomePage";
import StoreLayout from "./layouts/StoreLayout";
import CatalogPage from "./pages/store/CatalogPage";
import DetailProductPage from "./pages/store/DetailProductPage";
import AboutPage from "./pages/store/AboutPage";
import BlogPage from "./pages/store/BlogPage";
import ContactPage from "./pages/store/ContactPage";
import CartPage from "./pages/store/CartPage";
import CheckoutPage from "./pages/store/CheckoutPage";
import LoginPage from "./pages/store/LoginPage";
import RegisterPage from "./pages/store/RegisterPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InventarioPage from "./pages/admin/InventarioPage";
import NewProduct from "./pages/admin/NewProduct";
import UserManagement from "./pages/admin/UserManagement";
import NewUser from "./pages/admin/NewUser";
import ShowUser from "./pages/admin/ShowUser";
import EditUser from "./pages/admin/EditUser";
import DeleteUser from "./pages/admin/DeleteUser";
import UserPurchaseHistory from "./pages/admin/UserPurchaseHistory";
import ShowProduct from "./pages/admin/ShowProduct";
import EditProduct from "./pages/admin/EditProduct";
import DeleteProduct from "./pages/admin/DeleteProduct";
import ConfiguracionesPage from "./pages/admin/ConfiguracionesPage";
import PerfilPage from "./pages/admin/PerfilPage";
import BuscarPage from "./pages/admin/BuscarPage";
import AyudaPage from "./pages/admin/AyudaPage";
import OrderManagement from "./pages/admin/OrderManagement";
import ShowOrden from "./pages/admin/ShowOrden";
import ReportesPage from "./pages/admin/ReportesPage";
import NotFoundPage from "./pages/common/NotFoundPage";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { initializeApp } from "./services/initializationService";
import OrdenSummaryPage from "./pages/store/OrdenSummaryPage";
import DiscountProductPage from "./pages/store/DiscountProductPage";

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
        path: "productos/:id",
        element: <DetailProductPage />,
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
        path: "pago",
        element: <CheckoutPage />,
      },
      {
        path: "resumen-compra",
        element: <OrdenSummaryPage />,
      },
      {
        path: "descuentos",
        element: <DiscountProductPage />,
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
        path: "nuevo-producto",
        element: <NewProduct />,
      },
      {
        path: "producto/:id",
        element: <ShowProduct />,
      },
      {
        path: "editar-producto/:id",
        element: <EditProduct />,
      },
      {
        path: "eliminar-producto/:id",
        element: <DeleteProduct />,
      },
      {
        path: "usuarios",
        element: <UserManagement />,
      },
      {
        path: "usuario/:id",
        element: <ShowUser />,
      },
      {
        path: "editar-usuario/:id",
        element: <EditUser />,
      },
      {
        path: "eliminar-usuario/:id",
        element: <DeleteUser />,
      },
      {
        path: "usuario/:id/historial-compras",
        element: <UserPurchaseHistory />,
      },
      {
        path: "nuevo-usuario",
        element: <NewUser />,
      },
      {
        path: "ordenes",
        element: <OrderManagement />,
      },
      {
        path: "orden/:id",
        element: <ShowOrden />,
      },
      {
        path: "reportes",
        element: <ReportesPage />,
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
    initializeApp();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
