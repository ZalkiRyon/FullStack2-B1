import { useEffect, useState } from "react";
import { getProductosFromStorage } from "../../utils/dataProductos";
import ProductCard from "../../components/store/ProductCard";
import ProductFilters from "../../components/common/ProductFilters";
import Modal from "../../components/common/Modal";
import { useCart } from "../../context/CartContext";

function CatalogPage() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todas");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    let productosStorage = getProductosFromStorage();
    setProductos(productosStorage);
    setFilteredProductos(productosStorage);
  }, []);

  const handleAddCart = (produ) => {
    setIsModalOpen(true);
    addItem(produ, 1);
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

      <Modal
        isOpen={isModalOpen}
        title="Producto agregado con exito"
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        showCancelButton={false}
      />
    </div>
  );
}

export default CatalogPage;
