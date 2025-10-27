
// Se define un objeto global para evitar la redeclaración de variables globales
// y para encapsular la lógica del componente.
window.OrdenFiltersLogic = window.OrdenFiltersLogic || {};

/**
 * @function handleNumeroOrdenChange
 * @description Maneja el evento 'onChange' del campo de búsqueda por Número de Orden.
 * Llama a la función de callback `onNumeroOrdenChange` con el valor actual del input.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onNumeroOrdenChange - Prop de callback para actualizar el filtro de número de orden.
 */
window.OrdenFiltersLogic.handleNumeroOrdenChange = (e, onNumeroOrdenChange) => {
    if (typeof onNumeroOrdenChange === 'function' && e && e.target) {
        onNumeroOrdenChange(e.target.value);
    }
};

/**
 * @function handleClienteChange
 * @description Maneja el evento 'onChange' del campo de búsqueda por Cliente.
 * Llama a la función de callback `onClienteChange` con el valor actual del input.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onClienteChange - Prop de callback para actualizar el filtro de cliente.
 */
window.OrdenFiltersLogic.handleClienteChange = (e, onClienteChange) => {
    if (typeof onClienteChange === 'function' && e && e.target) {
        onClienteChange(e.target.value);
    }
};

/**
 * @function handleEstadoChange
 * @description Maneja el evento 'onChange' del select de Estado.
 * Llama a la función de callback `onEstadoChange` con el valor seleccionado.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onEstadoChange - Prop de callback para actualizar el filtro de estado.
 */
window.OrdenFiltersLogic.handleEstadoChange = (e, onEstadoChange) => {
    if (typeof onEstadoChange === 'function' && e && e.target) {
        onEstadoChange(e.target.value);
    }
};

/**
 * @function handleMontoChange
 * @description Maneja el evento 'onChange' del select de Monto.
 * Llama a la función de callback `onMontoChange` con el valor seleccionado.
 * @param {Object} e - Objeto de evento de React.
 * @param {function} onMontoChange - Prop de callback para actualizar el filtro de monto.
 */
window.OrdenFiltersLogic.handleMontoChange = (e, onMontoChange) => {
    if (typeof onMontoChange === 'function' && e && e.target) {
        onMontoChange(e.target.value);
    }
};

/**
 * @function handleLimpiarClick
 * @description Maneja el evento 'onClick' del botón Limpiar.
 * Llama directamente a la función de callback `onLimpiar`.
 * @param {function} onLimpiar - Prop de callback para resetear todos los filtros.
 */
window.OrdenFiltersLogic.handleLimpiarClick = (onLimpiar) => {
    if (typeof onLimpiar === 'function') {
        onLimpiar();
    }
};