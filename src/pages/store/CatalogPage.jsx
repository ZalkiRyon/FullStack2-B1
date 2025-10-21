import { useEffect, useState } from "react";
import { getProductosFromStorage } from "../../utils/dataProductos";
import ProductCard from "../../components/store/ProductCard";
import ProductFilters from "../../components/common/ProductFilters";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

function CatalogPage() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todas");

  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    let productosStorage = getProductosFromStorage();
    setProductos(productosStorage);
    setFilteredProductos(productosStorage);
  }, []);

  const handleAddCart = (produ) => {
    addItem(produ, 1);

    showToast(`Se agregó ${produ.nombre} al carrito.`, "success");
    console.log(produ);
  };

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

    setFilteredProductos(resultado);
  }, [searchTerm, categoriaFilter, productos]);

  const limpiarFiltros = () => {
    setSearchTerm("");
    setCategoriaFilter("todas");
  };

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  return (
    <div className="mainPage">
      <h3 className="text-center">Productos</h3>
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoriaFilter={categoriaFilter}
        onCategoriaChange={setCategoriaFilter}
        categorias={categorias}
        onLimpiar={limpiarFiltros}
        showStockFilter={false}
      />

      <div className="sectionTodosLosProductos">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((produ) => (
            <ProductCard
              key={produ.id}
              id={produ.id}
              name={produ.nombre}
              price={produ.precio}
              category={produ.categoria}
              image={produ.imagen}
              onClickButton={() => handleAddCart(produ)}
              variant="withButton"
            />
          ))
        ) : (
          <div>No se encontraron productos... </div>
        )}
      </div>
    </div>
  );
}

export default CatalogPage;
