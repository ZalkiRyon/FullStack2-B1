import { NavLink } from "react-router-dom";
import carrito from "../../assets/img/cart-icon.svg";

const CarritoHeader = ({ itemCount }) => {
  return (
    <NavLink
      to="/carrito"
      className={({ isActive }) =>
        isActive
          ? "carrito-container nav-link-base d-flex align-items-center active-link"
          : "carrito-container nav-link-base d-flex align-items-center"
      }
    >
      <div>
        <img
          src={carrito}
          alt="Logo carrito de compras"
          height="25"
          className="cartLogo"
        />
      </div>

      <p id="carritoTexto">{`(${itemCount})`}</p>
    </NavLink>
  );
};

export default CarritoHeader;
