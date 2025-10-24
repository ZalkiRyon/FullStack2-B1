import { Link } from "react-router-dom";
import { productImages } from "../../utils/dataProductos";
import PrimaryButton from "../common/PrimaryButton";

const DiscountProductCard = ({
  id,
  name,
  price,
  image,
  onClick,
  onClickButton,
}) => {
  const imagenSrc = productImages[image] || productImages["default"];

  const discountPercentage = 0.25;
  const inflatedPrice = price / (1 - discountPercentage);

  return (
    <article
      className="cardProductos cardProductos-discount"
      data-producto-id={id}
    >
      <Link to={`/productos/${id}`} onClick={onClick} className="cardLink">
        <div className="containerImgProductos">
          <img
            src={imagenSrc}
            alt={`Imagen Producto ${name}`}
            className="imgProductos"
          />
        </div>

        <h4 className="nameCardProductos">{name}</h4>

        <div className="price-section-discount">
          <span className="inflated-price">
            $
            {inflatedPrice.toLocaleString("es-CL", {
              maximumFractionDigits: 0,
            })}
          </span>

          <span className="priceCardProductos price-chip">
            ${price.toLocaleString("es-CL")}
          </span>
        </div>
      </Link>

      <PrimaryButton onClick={onClickButton} width="auto" text={"Añadir"} />
    </article>
  );
};

export default DiscountProductCard;
