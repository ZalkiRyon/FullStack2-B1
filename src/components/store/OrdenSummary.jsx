import React from "react";
import { useCart } from "../../context/CartContext";

const OrdenSummary = () => {
  const { cartItems, totalPrice } = useCart();
  console.log(cartItems);
  return (
    <div>
      <table className="product-table-details">
        <thead>
          <tr>
            <th style={{ width: "70%" }}>Imagen</th>
            <th style={{ width: "70%" }}>Nombre</th>
            <th style={{ textAlign: "left" }}>Precio</th>
            <th style={{ textAlign: "left" }}>Cantidad</th>
            <th style={{ textAlign: "left" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <span className="product-item-name">{item.imagen}</span>
              </td>
              <td>
                <span className="product-item-name">{item.nombre}</span>
              </td>
              <td style={{ textAlign: "left" }}>
                <span className="product-item-name">
                  $ {item.precio.toLocaleString("es-CL")}
                </span>
              </td>
              <td style={{ textAlign: "left" }}>
                <span className="product-item-name">{item.cantidad}</span>
              </td>
              <td style={{ textAlign: "left" }}>
                ${(item.precio * item.cantidad).toLocaleString("es-CL")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="summary-table">
        <tbody>
          <tr className="product-row">
            <td>Subtotal:</td>
            <td>${totalPrice.toLocaleString("es-CL")}</td>
          </tr>
          <tr className="product-row">
            <td>Envío:</td>
            <td>
              {/* {shippingCost === 0
                ? "GRATIS"
                : `$${shippingCost.toLocaleString("es-CL")}`} */}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="summary-total">
        <span>Total a Pagar:</span>
        {/* descuentos + subtoral */}
        <span className="total-amount">
          ${totalPrice.toLocaleString("es-CL")}
        </span>
      </div>
    </div>
  );
};

export default OrdenSummary;
