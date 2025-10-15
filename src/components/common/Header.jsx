import Navbar from "./Navbar";
import CarritoHeader from "./CarritoHeader";
import  icono  from "../../assets/img/icono.png";

const Header = () => {
  return (
    <header className="header">
      <div className="d-flex align-items-center">
        <div>
          <img src={icono} alt="Logo de Huerto Hogar" width="150" />
        </div>
        <h1>Huerto Hogar</h1>
      </div>
      <Navbar />
      <CarritoHeader />
    </header>
  );
};

export default Header;
