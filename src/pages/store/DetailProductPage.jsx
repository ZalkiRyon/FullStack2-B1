import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductosFromStorage } from "../../utils/dataProductos";
import { useCart } from "../../context/CartContext";
import Breadcrumbs from "../../components/common/BreadCrumbs";

const DetailProductPage = () => {
  const { id } = useParams();
  const { addItem, deleteItem } = useCart();
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    let productosStorage = getProductosFromStorage();
    const productoDetail = productosStorage.find((p) => p.id == id);

    setProducto(productoDetail);
  }, [id]);

  return (
    <main class="d-flex flex-column mainDetalleProducto">
      <Breadcrumbs />

      <section class="d-flex justify-content-between align-items-start">
        <div class="containerImgProductoDetalle">
          <img src="" class="imgDetalleProducto" id="imgDetalleProducto" />
        </div>
        <article class="detalleProducto">
          <header class="d-flex flex-column">
            <h2 id="nombreDetalleProducto"></h2>
            <h3 id="precioDetalleProducto"></h3>
          </header>
          <p id="descripcionDetalleProducto"></p>
          <div class="d-flex flex-row align-items-baseline gap-2">
            <label for="cantidad" class="cantidadDetalleLabel">
              Cantidad
            </label>
            <div class="cantidadDetalleContainer">
              <button class="btn-restar-detalle">-</button>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                min="1"
                max="100"
                value="1"
                class="cantidadProductoCarrito"
                onkeydown="return false"
                onpaste="return false"
              />
              <button class="btn-sumar-detalle">+</button>
            </div>
          </div>
          <button class="btnAddProductoDetalle">Añadir al carrito</button>
        </article>
      </section>
    </main>
  );
};

export default DetailProductPage;
