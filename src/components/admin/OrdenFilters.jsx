import React from "react";

const OrdenFilters = ({
  numeroOrdenFilter,
  onNumeroOrdenChange,
  clienteFilter,
  onClienteChange,
  montoFilter,
  onMontoChange,
  estadoFilter,
  onEstadoChange,
  estados,
  onLimpiar,
}) => {
  return (
    <div className="inventarioFilters">
      {/* Filtro por Número de Orden */}
      <div className="searchBox">
        <input
          type="text"
          placeholder="Buscar por N° de orden..."
          value={numeroOrdenFilter}
          onChange={(e) => onNumeroOrdenChange(e.target.value)}
          className="searchInput"
        />
      </div>

      {/* Filtro por Cliente */}
      <div className="searchBox">
        <input
          type="text"
          placeholder="Buscar por cliente..."
          value={clienteFilter}
          onChange={(e) => onClienteChange(e.target.value)}
          className="searchInput"
        />
      </div>

      {/* Filtro por Estado */}
      <select
        value={estadoFilter}
        onChange={(e) => onEstadoChange(e.target.value)}
        className="filterSelect"
      >
        <option value="todos">Todos los estados</option>
        {estados.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>

      {/* Filtro por Rango de Monto */}
      <select
        value={montoFilter}
        onChange={(e) => onMontoChange(e.target.value)}
        className="filterSelect"
      >
        <option value="todos">Todos los montos</option>
        <option value="0-5000">$0 - $5.000</option>
        <option value="5000-10000">$5.000 - $10.000</option>
        <option value="10000-20000">$10.000 - $20.000</option>
        <option value="20000-30000">$20.000 - $30.000</option>
        <option value="30000+">$30.000+</option>
      </select>

      {/* Botón limpiar */}
      <button onClick={onLimpiar} className="btnLimpiar">
        Limpiar
      </button>
    </div>
  );
};

export default OrdenFilters;
