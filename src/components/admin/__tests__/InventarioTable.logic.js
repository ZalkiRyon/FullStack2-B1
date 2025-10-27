// Se define un objeto global para evitar la redeclaración de variables globales
// y para encapsular la lógica del componente.
window.InventarioTableLogic = window.InventarioTableLogic || {};

// =============================================================================
// HANDLERS (Manejadores de Eventos)
// =============================================================================

/**
 * @function handleActionClick
 * @description Función genérica para manejar los clics en los botones de acción (Ver, Editar, Borrar).
 * Llama a la función de callback con el ID del producto.
 * @param {function} callback - La prop de callback a ejecutar (onVer, onEditar, onBorrar).
 * @param {number|string} productoId - El ID del producto.
 */
window.InventarioTableLogic.handleActionClick = (callback, productoId) => {
    // Se valida que el callback sea una función y que el ID no sea nulo/indefinido.
    if (typeof callback === 'function' && productoId != null) {
        callback(productoId);
    }
};

// =============================================================================
// LÓGICA DE PRESENTACIÓN (Formatters)
// =============================================================================

/**
 * @function formatPrice
 * @description Formatea un valor numérico a una cadena de precio con dos decimales,
 * prefijado con el símbolo '$'.
 * @param {number} price - El precio numérico del producto.
 * @returns {string} El precio formateado (ej: "$123.45").
 */
window.InventarioTableLogic.formatPrice = (price) => {
    // Valida que el precio sea un número finito. Si no, devuelve un valor seguro.
    if (typeof price !== 'number' || !isFinite(price)) {
        return '$0.00';
    }
    // Utiliza toFixed(2) para garantizar dos decimales.
    return `$${price.toFixed(2)}`;
};

/**
 * @function getNoResultsMessage
 * @description Retorna el mensaje a mostrar cuando no hay resultados en la tabla.
 * @param {boolean} hasProducts - Indica si la lista de productos está vacía o es nula.
 * @returns {string} El mensaje de "No se encontraron..." o vacío.
 */
window.InventarioTableLogic.getNoResultsMessage = (hasProducts) => {
    return hasProducts ? '' : 'No se encontraron productos en el inventario';
};