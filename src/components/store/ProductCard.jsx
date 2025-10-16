import React from "react";
import { Link } from "react-router-dom";
import { productImages } from "../../utils/dataProductos";
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
          <p>{category}</p>
          <p>${price}</p>
        </div>
      </article>
    );
  }

  if (variant === "withButton") {
    return (
      <article className="cardProductos" data-producto-id={id}>
        <Link
          to={`/producto/${id}`}
          onClick={onClick}
          className="card-link-wrapper"
        >
          <div className="containerImgProductos">
            <img
              src={imagenSrc}
              alt={`Imagen Producto ${name}`}
              className="imgProductos"
            />
          </div>
          <h4>{name}</h4>
          <span>${price}</span>
        </Link>

        <PrimaryButton onClick={onClickButton} className="btnAddProductos">
          Añadir
        </PrimaryButton>
      </article>
    );
  }

  return null;
};

export default ProductCard;
