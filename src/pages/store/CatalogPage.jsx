import React, { useEffect, useState } from "react";
import { getProductosFromStorage } from "../../utils/dataProductos";
import ProductCard from "../../components/store/ProductCard";

function CatalogPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    let productos = getProductosFromStorage();
    setProductos(productos);
  }, []);

  const handleAddCart = () => {
    alert("Se agregó al carrito");
  };

  console.log(productos);
  return (
    <div className="mainPage">
      <h3 className="text-center">Productos</h3>
      <label for="filtroCategoria">Filtrar por categoría:</label>
      <select id="filtroCategoria" className="filterProductos"></select>

      <div className="sectionTodosLosProductos">
        {productos.length > 0 ? (
          productos.map((produ) => (
            <ProductCard
              key={produ.id}
              id={produ.id}
              name={produ.nombre}
              price={produ.precio}
              category={produ.categoria}
              image={produ.imagen}
              onClickButton={handleAddCart}
              variant="withButton"
            />
          ))
        ) : (
          <div>No hay nada... </div>
        )}
      </div>
    </div>
  );
}

export default CatalogPage;
