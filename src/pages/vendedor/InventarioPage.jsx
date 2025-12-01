import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductFilters from "../../components/common/ProductFilters";
import ProductTable from "../../components/admin/ProductTable";
import { getAllProducts } from "../../services/ProductsService";

const InventarioPage = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todas");
  const [stockFilter, setStockFilter] = useState("todos");


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      setProductos(res);
      setFilteredProductos(res);
    };

    fetchProducts()
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

  // Funciones para acciones de productos (solo lectura)
  const handleVer = (id) => {
    navigate(`/vendedor/producto/${id}`);
  };

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Gestión de Inventario</h1>
          <p className="inventarioSubtitle">
            Consulta el inventario de productos de Huerto Hogar
          </p>
        </div>
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
          onEditar={null}
          onEliminar={null}
        />
      </div>
    </div>
  );
};

export default InventarioPage;
