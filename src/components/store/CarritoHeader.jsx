import { Link } from "react-router-dom";
import  carrito  from "../../assets/img/cart-icon.svg";

const CarritoHeader = ({ itemCount }) => {
  return (
    <Link to="/carrito" className="carrito-container nav-link-base d-flex align-items-center">
      <div>
        <img src={carrito} alt="Logo carrito de compras" height="25" />
      </div>

      <p id="carritoTexto">{`(${itemCount})`}</p>
    </Link>
  );
};

export default CarritoHeader;
