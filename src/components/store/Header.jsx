import Navbar from "./Navbar";
import CarritoHeader from "../store/CarritoHeader";
import icono from "../../assets/img/icono.png";
import { useCart } from "../../context/CartContext";

const Header = () => {

  const { totalItemsCount } = useCart();
  console.log(totalItemsCount)
  return (
    <header className="header">
      <div className="d-flex align-items-center">
        <div>
          <img src={icono} alt="Logo de Huerto Hogar" width="150" />
        </div>
        <h1>Huerto Hogar</h1>
      </div>
      <Navbar />
      <CarritoHeader itemCount={totalItemsCount} />
    </header>
  );
};

export default Header;
