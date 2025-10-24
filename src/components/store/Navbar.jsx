import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <NavLink
            to="/"
            // Se le entrega un parametro que es propio de la libreria
            // reconoce si se encuentra activo donde estamos posicionados cambia el color
            // mejorando asi la UX indicandole al usuario donde se encuentra
            className={({ isActive }) =>
              isActive ? "nav-link-base active-link" : "nav-link-base"
            }
          >
            Inicio
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              isActive ? "nav-link-base active-link" : "nav-link-base"
            }
          >
            Productos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/descuentos"
            className={({ isActive }) =>
              isActive ? "nav-link-base active-link" : "nav-link-base"
            }
          >
            Descuentos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              isActive ? "nav-link-base active-link" : "nav-link-base"
            }
          >
            Nosotros
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "nav-link-base active-link" : "nav-link-base"
            }
          >
            Blogs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              isActive ? "nav-link-base active-link" : "nav-link-base"
            }
          >
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
