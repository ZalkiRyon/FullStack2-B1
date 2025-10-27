
// Se define un objeto global para evitar la redeclaración de variables globales
// y para encapsular la lógica del componente.
window.UserTableLogic = window.UserTableLogic || {};

// =============================================================================
// HANDLERS (Manejadores de Eventos)
// =============================================================================

/**
 * @function handleActionClick
 * @description Función genérica para manejar los clics en los botones de acción (Ver, Editar, Historial).
 * Llama a la función de callback con el ID del usuario.
 * @param {function} callback - La prop de callback a ejecutar (onVer, onEditar, onHistorial).
 * @param {number|string} userId - El ID del usuario.
 */
window.UserTableLogic.handleActionClick = (callback, userId) => {
    // Se valida que el callback sea una función antes de ejecutar.
    if (typeof callback === 'function' && userId != null) {
        callback(userId);
    }
};

// =============================================================================
// LÓGICA DE PRESENTACIÓN (Formatters)
// =============================================================================

/**
 * @function getFullUserName
 * @description Concatena el nombre y apellido del usuario.
 * @param {Object} usuario - Objeto de usuario con 'nombre' y 'apellido'.
 * @returns {string} Nombre completo.
 */
window.UserTableLogic.getFullUserName = (usuario) => {
    if (!usuario || typeof usuario.nombre !== 'string' || typeof usuario.apellido !== 'string') {
        return '';
    }
    return `${usuario.nombre} ${usuario.apellido}`;
};

/**
 * @function getRoleClassName
 * @description Determina la clase CSS basada en el rol del usuario.
 * @param {string} role - El rol del usuario ('admin', 'vendedor', 'cliente', etc.).
 * @returns {string} La clase CSS específica del rol o la clase por defecto.
 */
window.UserTableLogic.getRoleClassName = (role) => {
    if (typeof role !== 'string') {
        role = ''; // Default a vacío para que caiga en rolCliente o una clase segura.
    }
    switch (role.toLowerCase()) {
        case 'admin':
            return 'rolAdmin';
        case 'vendedor':
            return 'rolVendedor';
        default:
            return 'rolCliente'; // Clase por defecto para cualquier otro rol.
    }
};

/**
 * @function formatRoleDisplay
 * @description Capitaliza la primera letra del rol para presentación.
 * @param {string} role - El string del rol (ej: 'admin').
 * @returns {string} El string con la primera letra en mayúscula (ej: 'Admin').
 */
window.UserTableLogic.formatRoleDisplay = (role) => {
    if (typeof role !== 'string' || role.length === 0) {
        return '';
    }
    // Asume que el rol es 'rolCliente' si el valor es vacío o inválido, para evitar errores de charAt(0)
    const validRole = role || 'cliente'; 
    return validRole.charAt(0).toUpperCase() + validRole.slice(1);
};