
// Se define un objeto global para evitar la redeclaración de variables globales
// y para encapsular la lógica del componente.
window.ProductFiltersLogic = window.ProductFiltersLogic || {};

/**
 * @function handleSearchChange
 * @description Maneja el evento 'onChange' del campo de búsqueda de productos.
 * Llama a la función de callback `onSearchChange` con el valor actual del input.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onSearchChange - Prop de callback para actualizar el filtro de búsqueda.
 */
window.ProductFiltersLogic.handleSearchChange = (e, onSearchChange) => {
    if (typeof onSearchChange === 'function' && e && e.target) {
        onSearchChange(e.target.value);
    }
};

/**
 * @function handleCategoriaChange
 * @description Maneja el evento 'onChange' del select de Categoría.
 * Llama a la función de callback `onCategoriaChange` con el valor seleccionado.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onCategoriaChange - Prop de callback para actualizar el filtro de categoría.
 */
window.ProductFiltersLogic.handleCategoriaChange = (e, onCategoriaChange) => {
    if (typeof onCategoriaChange === 'function' && e && e.target) {
        onCategoriaChange(e.target.value);
    }
};

/**
 * @function handleStockChange
 * @description Maneja el evento 'onChange' del select de Stock.
 * Llama a la función de callback `onStockChange` con el valor seleccionado.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onStockChange - Prop de callback para actualizar el filtro de stock.
 */
window.ProductFiltersLogic.handleStockChange = (e, onStockChange) => {
    if (typeof onStockChange === 'function' && e && e.target) {
        onStockChange(e.target.value);
    }
};

/**
 * @function handleLimpiarClick
 * @description Maneja el evento 'onClick' del botón Limpiar.
 * Llama directamente a la función de callback `onLimpiar`.
 * @param {function} onLimpiar - Prop de callback para resetear todos los filtros.
 */
window.ProductFiltersLogic.handleLimpiarClick = (onLimpiar) => {
    if (typeof onLimpiar === 'function') {
        onLimpiar();
    }
};