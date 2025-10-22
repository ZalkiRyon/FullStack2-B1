import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductosFromStorage } from "../../utils/dataProductos";
import { useCart } from "../../context/CartContext";
import Breadcrumbs from "../../components/common/BreadCrumbs";
import { productImages } from "../../utils/dataProductos";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useToast } from "../../context/ToastContext";

const DetailProductPage = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const { addItem } = useCart();

  const [producto, setProducto] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let productosStorage = getProductosFromStorage();
    const productoDetail = productosStorage.find((p) => p.id == id);

    setProducto(productoDetail);
  }, [id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddCart = () => {
    if (!producto) return;

    addItem(producto, quantity);
    showToast(
      `Se agregaron ${quantity} unidades de ${producto.nombre} al carrito.`,
      "success"
    );
    setQuantity(1);
  };

  if (!producto) {
    return (
      <main className="mainPage">
        <div>Cargando detalle del producto...</div>
      </main>
    );
  }

  const totalPrice = producto ? producto.precio * quantity : 0;

  const imagenSrc = productImages[producto.imagen] || productImages["default"];

  return (
    <main className="d-flex flex-column mainPage">
      <Breadcrumbs />

      <section className="d-flex justify-content-between align-items-start">
        <div className="containerImgProductoDetalle">
          <img
            src={imagenSrc}
            alt={`Imagen de ${producto.nombre}`}
            className="imgDetalleProducto"
          />
        </div>
        <article className="detalleProducto">
          <header className="d-flex flex-column">
            <h2 className="nombreDetalleProducto">{producto.nombre}</h2>
            <div className="precioUnitarioDetalle">
              <p>Precio unitario:</p>
              <p>
                <strong>${producto.precio.toLocaleString("es-CL")}</strong>
              </p>
            </div>
          </header>
          <p className="descripcionDetalleProducto">{producto.descripcion}</p>
          <div className="d-flex flex-row align-items-baseline gap-2">
            <label htmlFor="cantidad" className="cantidadDetalleLabel">
              Cantidad
            </label>

            <div className="controlQuantity">
              <button
                className="btnQuantity"
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                –
              </button>

              <input
                type="number"
                readOnly
                value={quantity}
                className="inputQuantity"
              />

              <button className="btnQuantity" onClick={handleIncrement}>
                +
              </button>
            </div>
          </div>
          <div className="precioTotalDetalle">
            <p> Total a pagar:</p>
            <p>
              <strong>${totalPrice.toLocaleString("es-CL")}</strong>
            </p>
          </div>
          <PrimaryButton text="Añadir al carrito" onClick={handleAddCart} />
        </article>
      </section>
    </main>
  );
};

export default DetailProductPage;
