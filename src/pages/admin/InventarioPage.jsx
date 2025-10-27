import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductosFromStorage } from "../../utils/dataProductos";
import PrimaryButton from "../../components/common/PrimaryButton";
import ProductFilters from "../../components/common/ProductFilters";
import ProductTable from "../../components/admin/ProductTable";

const InventarioPage = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todas");
  const [stockFilter, setStockFilter] = useState("todos");

  // Función para cargar productos
  const cargarProductos = () => {
    const productosStorage = getProductosFromStorage();
    setProductos(productosStorage);
    setFilteredProductos(productosStorage);
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Recargar productos cuando la página vuelva a estar visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        cargarProductos();
      }
    };

    // Escuchar cuando volvemos a esta página
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", cargarProductos);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", cargarProductos);
    };
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...productos];

    // Filtro de búsqueda por nombre o código
    if (searchTerm) {
      resultado = resultado.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (categoriaFilter !== "todas") {
      resultado = resultado.filter(
        (producto) => producto.categoria === categoriaFilter
      );
    }

    // Filtro por stock
    if (stockFilter !== "todos") {
      if (stockFilter === "critico") {
        resultado = resultado.filter((producto) => producto.stock < 100);
      } else if (stockFilter === "medio") {
        resultado = resultado.filter(
          (producto) => producto.stock >= 100 && producto.stock <= 200
        );
      } else if (stockFilter === "alto") {
        resultado = resultado.filter((producto) => producto.stock > 200);
      }
    }

    setFilteredProductos(resultado);
  }, [searchTerm, categoriaFilter, stockFilter, productos]);

  // Obtener categorías únicas
  const categorias = [...new Set(productos.map((p) => p.categoria))];

  // Limpiar filtros
  const limpiarFiltros = () => {
    setSearchTerm("");
    setCategoriaFilter("todas");
    setStockFilter("todos");
  };

  // Funciones para acciones de productos
  const handleVer = (id) => {
    navigate(`/admin/producto/${id}`);
  };

  const handleEditar = (id) => {
    navigate(`/admin/editar-producto/${id}`);
  };

  const handleEliminar = (id) => {
    navigate(`/admin/eliminar-producto/${id}`);
  };

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Gestión de Inventario</h1>
          <p className="inventarioSubtitle">
            Administra el inventario de productos de Huerto Hogar
          </p>
        </div>
        <PrimaryButton
          text="NUEVO PRODUCTO"
          width="auto"
          onClick={() => navigate("/admin/nuevo-producto")}
        />
      </div>

      {/* Sección de la tabla */}
      <div className="inventarioTableSection">
        <h2 className="tableTitle">Lista de Productos</h2>

        {/* Filtros */}
        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoriaFilter={categoriaFilter}
          onCategoriaChange={setCategoriaFilter}
          stockFilter={stockFilter}
          onStockChange={setStockFilter}
          categorias={categorias}
          onLimpiar={limpiarFiltros}
        />

        {/* Tabla de productos */}
        <ProductTable
          productos={filteredProductos}
          onVer={handleVer}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </div>
    </div>
  );
};

export default InventarioPage;
