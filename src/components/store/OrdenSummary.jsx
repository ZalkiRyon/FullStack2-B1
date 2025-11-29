import { useCart } from "../../context/CartContext";
import { productImages } from "../../utils/productUtils";

const OrdenSummary = ({ shippingCost, finalTotal }) => {
  const { cartItems, totalPrice } = useCart();

  return (
    <div>
      <table className="productTable">
        <thead>
          <tr>
            <th style={{ width: "15%" }}>Imagen</th>
            <th style={{ width: "40%" }}>Nombre</th>
            <th style={{ textAlign: "left", width: "15%" }}>Precio</th>
            <th style={{ textAlign: "right", width: "15%" }}>Cantidad</th>
            <th style={{ textAlign: "right", width: "20%" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const imagenSrc =
              productImages[item.imagen] || productImages["default"];
            return (
              <tr key={item.id}>
                <td>
                  <img
                    src={imagenSrc}
                    alt={`Imagen del producto ${item.nombre}`}
                  />
                </td>
                <td>
                  <span className="product-item-name">{item.nombre}</span>
                </td>
                <td style={{ textAlign: "left" }}>
                  <span className="product-item-name">
                    $ {item.precio.toLocaleString("es-CL")}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span className="product-item-name">{item.cantidad}</span>
                </td>
                <td style={{ textAlign: "right" }}>
                  ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className="summaryTable">
        <tbody>
          <tr className="summaryTableRow">
            <td style={{ textAlign: "left" }}>Subtotal:</td>
            <td style={{ textAlign: "right" }}>
              ${totalPrice.toLocaleString("es-CL")}
            </td>
          </tr>
          <tr className="summaryTableRow">
            <td>Envío:</td>
            <td style={{ textAlign: "right" }}>
              {typeof shippingCost === "number"
                ? shippingCost === 0
                  ? "GRATIS"
                  : `$${shippingCost.toLocaleString("es-CL")}`
                : shippingCost}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="summaryTotal">
        <span>Total a Pagar:</span>

        <span className="totalAmount">
          {typeof finalTotal === "number"
            ? `$${finalTotal.toLocaleString("es-CL")}`
            : finalTotal}
        </span>
      </div>
    </div>
  );
};

export default OrdenSummary;
