import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

import DiscountProductCard from "../../components/store/DiscountProductCard";
import { getAllProducts } from "../../services/ProductsService";

const DiscountProductPage = () => {
  const [productos, setProductos] = useState([]);

  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      setProductos(res.filter((p) => p.id % 2 !== 0).slice(0, 6));
    };
    fetchProducts()
  }, []);

  const handleAddCart = (produ) => {
    addItem(produ, 1);
    showToast(
      `Se agregó ${produ.nombre} al carrito con precio de descuento.`,
      "success"
    );
  };

  return (
    <div className="mainPage">
      <h1 className="title">Ofertas Exclusivas de la Semana</h1>

      <div className="discount-product-grid">
        {productos.length > 0 ? (
          productos.map((produ) => (
            <DiscountProductCard
              key={produ.id}
              id={produ.id}
              name={produ.nombre}
              image={produ.imagen}
              price={produ.precio}
              onClickButton={() => handleAddCart(produ)}
            />
          ))
        ) : (
          <div>No se encontraron productos en oferta.</div>
        )}
      </div>
    </div>
  );
};

export default DiscountProductPage;
