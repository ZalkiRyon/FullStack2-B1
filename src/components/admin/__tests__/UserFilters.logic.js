
// Se define un objeto global para evitar la redeclaración de variables globales
// y para encapsular la lógica del componente.
window.UserFiltersLogic = window.UserFiltersLogic || {};

/**
 * @function handleSearchChange
 * @description Maneja el evento 'onChange' del campo de búsqueda de usuarios.
 * Llama a la función de callback `onSearchChange` con el valor actual del input.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onSearchChange - Prop de callback para actualizar el filtro de búsqueda.
 */
window.UserFiltersLogic.handleSearchChange = (e, onSearchChange) => {
    if (typeof onSearchChange === 'function' && e && e.target) {
        onSearchChange(e.target.value);
    }
};

/**
 * @function handleRolChange
 * @description Maneja el evento 'onChange' del select de Rol.
 * Llama a la función de callback `onRolChange` con el valor seleccionado.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onRolChange - Prop de callback para actualizar el filtro de rol.
 */
window.UserFiltersLogic.handleRolChange = (e, onRolChange) => {
    if (typeof onRolChange === 'function' && e && e.target) {
        onRolChange(e.target.value);
    }
};

/**
 * @function handleLimpiarClick
 * @description Maneja el evento 'onClick' del botón Limpiar.
 * Llama directamente a la función de callback `onLimpiar`.
 * @param {function} onLimpiar - Prop de callback para resetear todos los filtros.
 */
window.UserFiltersLogic.handleLimpiarClick = (onLimpiar) => {
    if (typeof onLimpiar === 'function') {
        onLimpiar();
    }
};

/**
 * @function formatRolDisplay
 * @description Función utilitaria para capitalizar la primera letra de un rol.
 * Usada para replicar la lógica de presentación del componente original.
 * @param {string} rol - El string del rol (ej: 'admin').
 * @returns {string} El string con la primera letra en mayúscula (ej: 'Admin').
 */
window.UserFiltersLogic.formatRolDisplay = (rol) => {
    if (typeof rol !== 'string' || rol.length === 0) {
        return '';
    }
    return rol.charAt(0).toUpperCase() + rol.slice(1);
};