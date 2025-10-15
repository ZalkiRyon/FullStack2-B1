import React from "react";
import { Link } from "react-router-dom";
import tarjetasImg from "../../assets/img/tarjetas.png";
import PrimaryButton from "../common/PrimaryButton";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="izq-footer">
        <div className="footer-content">
          <p>Huerto Hogar © 2025</p>

          <nav className="nav-footer">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link" to="/productos?category=frutas">
                  Frutas frescas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos?category=verduras">
                  Verduras orgánicas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos?category=organicos">
                  Productos orgánicos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos?category=lacteos">
                  Productos lácteos
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div style={{ height: "50px", width: "auto" }}>
          <img
            src={tarjetasImg}
            alt="Imagen de tarjetas de credito"
            style={{ height: "100%" }}
          />
        </div>
      </div>

      <div className="der-footer">
        <p>Quédate en contacto, únete a nuestro boletín</p>
        <div>
          <input
            type="email"
            placeholder="Ingresa tu email"
            className="inputFooter"
          />
          <PrimaryButton text={"Suscribirse"} width="auto"/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
