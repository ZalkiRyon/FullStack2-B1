const ProductFilters = ({
  searchTerm,
  onSearchChange,
  categoriaFilter,
  onCategoriaChange,
  stockFilter,
  onStockChange,
  categorias,
  onLimpiar,
  showStockFilter = true,
}) => {
  return (
    <div className="inventarioFilters">
      {/* Búsqueda */}
      <div className="searchBox">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="searchInput"
        />       
      </div>

      {/* Filtro de categoría */}
      <select
        value={categoriaFilter}
        onChange={(e) => onCategoriaChange(e.target.value)}
        className="filterSelect"
      >
        <option value="todas">Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Filtro de stock */}
      {showStockFilter && (
        <select
          value={stockFilter}
          onChange={(e) => onStockChange(e.target.value)}
          className="filterSelect"
        >
          <option value="todos">Todos los stocks</option>
          <option value="critico">Stock Crítico (&lt; 100)</option>
          <option value="medio">Stock Medio (100-200)</option>
          <option value="alto">Stock Alto (&gt; 200)</option>
        </select>
      )}

      {/* Botón limpiar */}
      <button onClick={onLimpiar} className="btnLimpiar">
        Limpiar
      </button>
    </div>
  );
};

export default ProductFilters;
