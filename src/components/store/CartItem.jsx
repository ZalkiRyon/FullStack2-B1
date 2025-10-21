import { productImages } from "../../utils/dataProductos";

const CartItem = ({
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
    <article className="cart-item-card" data-product-id={id}>
      <div className="cart-item-image-container">
        <img
          src={imagenSrc}
          alt={`Imagen de ${name}`}
          className="cart-item-image"
        />
      </div>

      <div className="cart-item-details">
        <h4 className="cart-item-name">{name}</h4>
        <p className="cart-item-description">
          {description.substring(0, 100)}...
        </p>
      </div>

      <div className="cart-item-controls">
        <span className="cart-item-price">
          ${price.toLocaleString() * quantity}
        </span>

        <div className="quantity-control">
          <button
            className="quantity-btn decrement"
            onClick={() => onDecrement(id)}
            disabled={quantity < 1}
          >
            –
          </button>

          <input
            type="number"
            readOnly
            value={quantity}
            className="quantity-input"
          />

          <button
            className="quantity-btn increment"
            onClick={() => onIncrement(id)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
