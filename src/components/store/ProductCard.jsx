import { Link } from "react-router-dom";
import { productImages } from "../../utils/productUtils";
import PrimaryButton from "../common/PrimaryButton";
// id -> number
// name -> string
// price -> number
// category -> string
// image -> string
// onClick -> funcion que se le entregara
// variant -> default es sin boton withbutton es con btn

const ProductCard = ({
  id,
  name,
  price,
  category,
  image,
  onClick,
  onClickButton,
  variant = "default",
}) => {
  const imagenSrc = productImages[image] || productImages["default"];

  if (variant === "default") {
    return (
      <article className="cartaProducto">
        <div className="imgCartaProducto">
          <img src={imagenSrc} alt={`Producto ${name}`} />
        </div>
        <div className="contenidoCartaProducto">
          <p>{name}</p>
          <p>${price.toLocaleString("es-CL")}</p>
        </div>
      </article>
    );
  }

  if (variant === "withButton") {
    return (
      <article className="cardProductos" data-producto-id={id}>
        <Link to={`/productos/${id}`} onClick={onClick} className="cardLink">
          <div className="containerImgProductos">
            <img
              src={imagenSrc}
              alt={`Imagen Producto ${name}`}
              className="imgProductos"
            />
          </div>
          <h4 className="nameCardProductos">{name}</h4>
          <span className="priceCardProductos">
            ${price.toLocaleString("es-CL")}
          </span>
          
        </Link>

        <PrimaryButton onClick={onClickButton} width="auto" text={"Añadir"} />
      </article>
    );
  }

  return null;
};

export default ProductCard;
