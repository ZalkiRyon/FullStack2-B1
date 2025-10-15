import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/productos">Productos</NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/nosotros">Nosotros</NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/blogs">Blogs</NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/contacto">Contacto</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
