import React from "react";
import { Link } from "react-router-dom";
import principalImg from "../../assets/img/img-principal.jpg";
import PrimaryButton from "../../components/common/PrimaryButton";
import Footer from "../../components/store/Footer";

const HomePage = () => {
  return (
    <div>
      <nav className="navSesion">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link" to="/inicio-sesion">
              Iniciar sesión
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registro">
              Registrar usuario
            </Link>
          </li>
        </ul>
      </nav>

      <section className="seccion-principal">
        <div className="izq-seccion-principal gap-2">
          <div className="texto-seccion-principal">
            <h1>Huerto Hogar</h1>
            <p>
              ¡Descubre la frescura del campo con HuertoHogar!
              <br />
              Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.
              <br />
              ¡Únete a nosotros y disfruta de productos frescos y saludables,
              directo a tu hogar!
            </p>
          </div>
          <PrimaryButton
            text={"Ver productos"}
            to={"/productos"}
            width="auto"
          />
        </div>
        <div className="img-principal">
          <img src={principalImg} alt="Imagen del banner principal" />
        </div>
      </section>

      <section className="seccion-productos">
        {/* Componente para productos destacados, por ejemplo: */}
        <h2>Productos Destacados</h2>
        <div>{/* Aquí iría el componente de renderizado de productos */}</div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
