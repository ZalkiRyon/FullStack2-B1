import React from "react";

const UserFilters = ({
  searchTerm,
  onSearchChange,
  rolFilter,
  onRolChange,
  roles,
  onLimpiar,
}) => {
  return (
    <div className="inventarioFilters">
      {/* Búsqueda */}
      <div className="searchBox">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="searchInput"
        />        
      </div>

      {/* Filtro de rol */}
      <select
        value={rolFilter}
        onChange={(e) => onRolChange(e.target.value)}
        className="filterSelect"
      >
        <option value="todos">Todos los roles</option>
        {roles.map((rol) => (
          <option key={rol} value={rol}>
            {rol.charAt(0).toUpperCase() + rol.slice(1)}
          </option>
        ))}
      </select>

      {/* Botón limpiar */}
      <button onClick={onLimpiar} className="btnLimpiar">
        Limpiar
      </button>
    </div>
  );
};

export default UserFilters;
