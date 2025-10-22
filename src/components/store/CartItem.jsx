import { productImages } from "../../utils/dataProductos";

export const CartItem = ({
  id,
  name,
  price,
  image,
  description,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  const imagenSrc = productImages[image] || productImages["default"];

  return (
    <article className="productoCarrito" data-product-id={id}>
      <div className="leftSideCartItem">
        <div className="containerImgProductoCarrito">
          <img
            src={imagenSrc}
            alt={`Imagen de ${name}`}
            className="imgProductoCarrito"
          />
        </div>
        <div className="infoProductoCarrito">
          <h4 className="infoProductoCarritoNombre">{name}</h4>
          <p className="infoProductoCarritoDescription">
            {description.substring(0, 100)}...
          </p>
        </div>
      </div>

      <div className="productoCarritoControls">
        <span className="precioItem">
          Subtotal: ${(price * quantity).toLocaleString("es-CL")}
        </span>

        <div className="controlQuantity">
          <button
            className="btnQuantity"
            onClick={() => onDecrement(id)}
            disabled={quantity < 1}
          >
            –
          </button>

          <input
            type="number"
            readOnly
            value={quantity}
            className="inputQuantity"
          />

          <button className="btnQuantity" onClick={() => onIncrement(id)}>
            +
          </button>
        </div>
      </div>
    </article>
  );
};


