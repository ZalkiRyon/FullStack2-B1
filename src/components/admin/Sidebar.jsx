import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import icono from "../../assets/img/icono.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  // Obtener datos del usuario o usar placeholder
  const userRole = usuario?.rolNombre === "admin" ? "Super Administrador" : "Usuario";
  const userName = usuario
    ? `${usuario.nombre} ${usuario.apellido}`
    : "{Nombre Usuario}";

  const handleCerrarSesion = () => {
    const confirmacion = window.confirm(
      "¿Está seguro que desea cerrar sesión?"
    );

    if (confirmacion) {
      logout();
      navigate("/");
    }
  };

  return (
    <aside className="adminSidebar">
      {/* Logo y nombre de la empresa */}
      <div className="sidebarHeader">
        <img src={icono} alt="Logo Huerto Hogar" className="sidebarLogo" />
        <h2 className="sidebarTitle">Huerto Hogar</h2>
      </div>

      {/* Navegación principal */}
      <nav className="sidebarNav">
        <ul className="sidebarMenu">
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarText">Dashboard</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/inventario"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarText">Inventario</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarText">Usuarios</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/ordenes"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarText">Ordenes</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/reportes"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarText">Reportes</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Sección inferior */}
      <div className="sidebarFooter">
        <ul className="sidebarMenuFooter">
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/perfil"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarText">Perfil</span>
            </NavLink>
          </li>
        </ul>

        {/* Usuario conectado y botón de cerrar sesión */}
        <div className="sidebarUser">
          <div className="sidebarUserInfo">
            <div className="sidebarUserDetails">
              <span className="sidebarUserRole">{userRole}:</span>
              <span className="sidebarUserName">{userName}</span>
            </div>
          </div>
          <button className="btnCerrarSesion" onClick={handleCerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
