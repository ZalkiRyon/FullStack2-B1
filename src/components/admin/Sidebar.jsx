import React from "react";
import { NavLink } from "react-router-dom";
import icono from "../../assets/img/icono.png";

const Sidebar = () => {
  // Placeholder para el usuario conectado
  const userRole = "Admin";
  const userName = "{Nombre Usuario}";

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
              <span className="sidebarIcon">📊</span>
              <span className="sidebarText">Dashboard</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/ordenes"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">🛒</span>
              <span className="sidebarText">Ordenes</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/inventario"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">📦</span>
              <span className="sidebarText">Inventario</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/reportes"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">📈</span>
              <span className="sidebarText">Reportes</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/empleados"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">👥</span>
              <span className="sidebarText">Empleados</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">👤</span>
              <span className="sidebarText">Usuarios</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Sección inferior */}
      <div className="sidebarFooter">
        <ul className="sidebarMenuFooter">
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/configuraciones"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">⚙️</span>
              <span className="sidebarText">Configuraciones</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/perfil"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">✏️</span>
              <span className="sidebarText">Perfil</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/buscar"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">🔍</span>
              <span className="sidebarText">Buscar</span>
            </NavLink>
          </li>
          <li className="sidebarMenuItem">
            <NavLink
              to="/admin/ayuda"
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"
              }
            >
              <span className="sidebarIcon">❓</span>
              <span className="sidebarText">Ayuda</span>
            </NavLink>
          </li>
        </ul>

        {/* Usuario conectado y botón de cerrar sesión */}
        <div className="sidebarUser">
          <div className="sidebarUserInfo">
            <span className="sidebarIcon">👤</span>
            <div className="sidebarUserDetails">
              <span className="sidebarUserRole">{userRole}:</span>
              <span className="sidebarUserName">{userName}</span>
            </div>
          </div>
          <button className="btnCerrarSesion">Cerrar Sesión</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
