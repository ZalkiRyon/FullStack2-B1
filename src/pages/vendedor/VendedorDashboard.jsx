import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getAllOrders } from "../../services/OrderService";
import DashboardStatCard from "../../components/admin/DashboardStatCard";
import DashboardActionCard from "../../components/admin/DashboardActionCard";
import { getAllProducts } from "../../services/ProductsService";

const VendedorDashboard = () => {
  const { usuario } = useAuth();
  const [stats, setStats] = useState({
    totalOrdenes: 0,
    totalProductosDistintos: 0,
    totalStockProductos: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      const ordenes = await getAllOrders();

      // Cargar datos desde API
      const productos = allProducts;
     
      // Calcular estadísticas
      const totalOrdenes = ordenes.length;
      const totalProductosDistintos = productos.length;
      const totalStockProductos = productos.reduce(
        (sum, producto) => sum + producto.stock,
        0
      );

      setStats({
        totalOrdenes,
        totalProductosDistintos,
        totalStockProductos,
      });
    };

    fetchProducts();
  }, []);

  // Obtener el nombre completo del usuario o usar placeholder
  const userName = usuario
    ? `${usuario.nombre} ${usuario.apellido}`
    : "Nombre Usuario";

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Dashboard</h1>
          <p className="inventarioSubtitle">
            ¡Bienvenido de nuevo, {userName}!
          </p>
        </div>
      </div>

      {/* Cards de estadísticas principales */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
          padding: "0 20px",
        }}
      >
        <DashboardStatCard
          title="Ordenes"
          value={stats.totalOrdenes}
          gradient="linear-gradient(135deg, #667eea 0%, #4f5bd5 100%)"
        />
        <DashboardStatCard
          title="Productos"
          value={stats.totalProductosDistintos}
          subtitle={`Inventario actual: ${stats.totalStockProductos}`}
          gradient="linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
        />
      </div>

      {/* Botones de acceso rápido */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          padding: "0 20px",
        }}
      >
        <DashboardActionCard
          title="Dashboard"
          description="Visión general de todas las métricas y estadísticas clave del sistema."
          isActive={true}
        />
        <DashboardActionCard
          title="Ordenes"
          description="Gestión y seguimiento de todas las órdenes de compra realizadas."
          route="/vendedor/ordenes"
        />
        <DashboardActionCard
          title="Productos"
          description="Administrar inventario y detalles de los productos disponibles."
          route="/vendedor/inventario"
        />
        <DashboardActionCard
          title="Perfil"
          description="Información personal y configuraciones de cuenta."
          route="/vendedor/perfil"
        />
        <DashboardActionCard
          title="Tienda"
          description="Visualiza tu tienda como un cliente."
          route="/"
        />
      </div>
    </div>
  );
};

export default VendedorDashboard;
