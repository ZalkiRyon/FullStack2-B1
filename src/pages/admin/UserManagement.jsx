import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuariosFromStorage } from "../../utils/data";
import PrimaryButton from "../../components/common/PrimaryButton";
import UserFilters from "../../components/admin/UserFilters";
import UserTable from "../../components/admin/UserTable";

const UserManagement = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rolFilter, setRolFilter] = useState("todos");

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const usuariosStorage = getUsuariosFromStorage();
    setUsuarios(usuariosStorage);
    setFilteredUsuarios(usuariosStorage);
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let resultado = [...usuarios];

    // Filtro de búsqueda por nombre completo o teléfono
    if (searchTerm) {
      resultado = resultado.filter((usuario) => {
        const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
        const telefono = usuario.telefono.toLowerCase();
        const busqueda = searchTerm.toLowerCase();
        return nombreCompleto.includes(busqueda) || telefono.includes(busqueda);
      });
    }

    // Filtro por rol
    if (rolFilter !== "todos") {
      resultado = resultado.filter((usuario) => usuario.role === rolFilter);
    }

    setFilteredUsuarios(resultado);
  }, [searchTerm, rolFilter, usuarios]);

  // Obtener roles únicos
  const roles = [...new Set(usuarios.map((u) => u.role))];

  // Limpiar filtros
  const limpiarFiltros = () => {
    setSearchTerm("");
    setRolFilter("todos");
  };

  // Funciones placeholder para acciones
  const handleVer = (id) => {
    console.log("Ver usuario:", id);
  };

  const handleEditar = (id) => {
    console.log("Editar usuario:", id);
  };

  const handleEliminar = (id) => {
    console.log("Eliminar usuario:", id);
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
          onEliminar={handleEliminar}
        />
      </div>
    </div>
  );
};

export default UserManagement;
