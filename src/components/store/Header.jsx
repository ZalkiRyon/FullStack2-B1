import Navbar from "./Navbar";
import CarritoHeader from "../store/CarritoHeader";
import icono from "../../assets/img/icono.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserDropdown from "./UserDropdown";
import Modal from "../common/Modal";
import { useToast } from "../../context/ToastContext";

const Header = () => {
  const { totalItemsCount, cleanCart } = useCart();
  const { usuario, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutAttempt = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    if (logout) {
      navigate("/");
      logout();
      cleanCart();
      showToast("Sesión cerrada con exito", "success", 5000);
    }
  };

  console.log(usuario)

  return (
    <>
      <header className="header">
        <Link to="/" className="d-flex align-items-center header-logo-group">
          <div>
            <img src={icono} alt="Logo de Huerto Hogar" width="70" />
          </div>
          <h2 className="">Huerto Hogar</h2>
        </Link>

        <div className="flex-grow-1">
          <Navbar />
        </div>

        <div className="d-flex align-items-center header-right-group">
          <div className="nav-auth-section me-3">
            {!!usuario ? (
              <div
                className="user-greeting-wrapper"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <h4 className="nav-link-base grettingUser clickable-saludo">
                  Hola, {usuario.nombre + " " + usuario.apellido}
                </h4>
                {isMenuOpen && (
                  <UserDropdown
                    usuario={usuario}
                    onLogout={handleLogoutAttempt}
                  />
                )}
              </div>
            ) : (
              <ul className="nav d-flex align-items-center">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link-auth active-link" : "nav-link-auth"
                    }
                    to="/inicio-sesion"
                  >
                    Iniciar sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link-auth active-link" : "nav-link-auth"
                    }
                    to="/registro"
                  >
                    Registrar usuario
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <CarritoHeader itemCount={totalItemsCount} />
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Cerrar Sesión"
        message={`¿Estás seguro que deseas cerrar sesión, ${usuario?.nombre}?`}
        confirmText="Sí, Cerrar Sesión"
        showCancelButton={true}
      />
    </>
  );
};

export default Header;
