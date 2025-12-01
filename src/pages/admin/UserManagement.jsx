import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import UserFilters from "../../components/admin/UserFilters";
import UserTable from "../../components/admin/UserTable";
import { getAllUsers } from "../../services/UserService";

const UserManagement = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rolFilter, setRolFilter] = useState("todos");

  useEffect(() => {
    const cargarUsuarios = async () => {
      const usuariosStorage = await getAllUsers();
      setUsuarios(usuariosStorage);
      setFilteredUsuarios(usuariosStorage);
    };
    cargarUsuarios();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...usuarios];

    // Filtro de búsqueda por nombre completo o teléfono
    if (searchTerm) {
      resultado = resultado.filter((usuario) => {
        const nombreCompleto =
          `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
        const telefono = usuario.telefono.toLowerCase();
        const busqueda = searchTerm.toLowerCase();
        return nombreCompleto.includes(busqueda) || telefono.includes(busqueda);
      });
    }

    // Filtro por rol
    if (rolFilter !== "todos") {
      resultado = resultado.filter(
        (usuario) => usuario.roleNombre === rolFilter
      );
    }

    setFilteredUsuarios(resultado);
  }, [searchTerm, rolFilter, usuarios]);

  // Obtener roles únicos
  const roles = [...new Set(usuarios.map((u) => u.roleNombre))];

  // Limpiar filtros
  const limpiarFiltros = () => {
    setSearchTerm("");
    setRolFilter("todos");
  };

  // Funciones placeholder para acciones
  const handleVer = (id) => {
    navigate(`/admin/usuario/${id}`);
  };

  const handleEditar = (id) => {
    navigate(`/admin/editar-usuario/${id}`);
  };

  const handleHistorial = (id) => {
    navigate(`/admin/usuario/${id}/historial-compras`);
  };

  const handleEliminar = (id) => {
    navigate(`/admin/eliminar-usuario/${id}`);
  };

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Gestión de Usuarios</h1>
          <p className="inventarioSubtitle">
            Administra los usuarios del sistema de Huerto Hogar
          </p>
        </div>
        <PrimaryButton
          text="NUEVO USUARIO"
          width="auto"
          onClick={() => navigate("/admin/nuevo-usuario")}
        />
      </div>

      {/* Sección de la tabla */}
      <div className="inventarioTableSection">
        <h2 className="tableTitle">Lista de Usuarios</h2>

        {/* Filtros */}
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          rolFilter={rolFilter}
          onRolChange={setRolFilter}
          roles={roles}
          onLimpiar={limpiarFiltros}
        />

        {/* Tabla de usuarios */}
        <UserTable
          usuarios={filteredUsuarios}
          onVer={handleVer}
          onEditar={handleEditar}
          onHistorial={handleHistorial}
          onEliminar={handleEliminar}
        />
      </div>
    </div>
  );
};

export default UserManagement;
