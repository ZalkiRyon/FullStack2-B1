import { getAllUsers } from "../services/UserService";

/**
 * Valida que el email sea único en el sistema
 * @param {string} email - Email a validar
 * @param {number} excludeId - ID de usuario a excluir de la validación (para edición)
 * @returns {boolean} - true si el email es único, false si ya existe
 */
export const validarEmailUnico = async (email, excludeId = null) => {
  const usuarios = await getAllUsers();
  return !usuarios.some(
    u => u.email.toLowerCase() === email.toLowerCase() && u.id !== excludeId
  );
};

/**
 * Valida que el RUN sea único en el sistema
 * @param {string} run - RUN a validar
 * @param {number} excludeId - ID de usuario a excluir de la validación (para edición)
 * @returns {boolean} - true si el RUN es único, false si ya existe
 */
export const validarRunUnico = async (run, excludeId = null) => {
  const usuarios = await getAllUsers();
  return !usuarios.some(u => u.run === run && u.id !== excludeId);
};

/**
 * Valida el formato del email
 * @param {string} email - Email a validar
 * @returns {boolean} - true si el formato es válido
 */
export const validarFormatoEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida el formato del RUN chileno
 * @param {string} run - RUN a validar (formato: XX.XXX.XXX-X)
 * @returns {boolean} - true si el formato es válido
 */
export const validarFormatoRun = (run) => {
  const runRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
  return runRegex.test(run);
};

/**
 * Valida el formato del teléfono chileno
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} - true si el formato es válido
 */
export const validarFormatoTelefono = (telefono) => {
  const telefonoRegex = /^(\+?56)?(\s?)(0?9)(\s?)[98765]\d{7}$/;
  return telefonoRegex.test(telefono) || /^\d{9}$/.test(telefono);
};

/**
 * Valida la fortaleza de la contraseña
 * @param {string} password - Contraseña a validar
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validarPassword = (password) => {
  const errors = [];
  
  if (password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una mayúscula");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una minúscula");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("La contraseña debe contener al menos un número");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida todos los campos de un usuario
 * @param {Object} usuario - Objeto con los datos del usuario
 * @param {number} excludeId - ID a excluir en validaciones de unicidad (para edición)
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validarUsuario = (usuario, excludeId = null) => {
  const errors = {};
  
  // Validar nombre
  if (!usuario.nombre || usuario.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres";
  }
  
  // Validar apellido
  if (!usuario.apellido || usuario.apellido.trim().length < 2) {
    errors.apellido = "El apellido debe tener al menos 2 caracteres";
  }
  
  // Validar email
  if (!usuario.email || !validarFormatoEmail(usuario.email)) {
    errors.email = "El formato del email no es válido";
  } else if (!validarEmailUnico(usuario.email, excludeId)) {
    errors.email = "Este email ya está registrado";
  }
  
  // Validar RUN
  if (!usuario.run || !validarFormatoRun(usuario.run)) {
    errors.run = "El formato del RUN no es válido (XX.XXX.XXX-X)";
  } else if (!validarRunUnico(usuario.run, excludeId)) {
    errors.run = "Este RUN ya está registrado";
  }
  
  // Validar teléfono
  if (usuario.telefono && !validarFormatoTelefono(usuario.telefono)) {
    errors.telefono = "El formato del teléfono no es válido";
  }
  
  // Validar región
  if (!usuario.region) {
    errors.region = "Debe seleccionar una región";
  }
  
  // Validar comuna
  if (!usuario.comuna) {
    errors.comuna = "Debe seleccionar una comuna";
  }
  
  // Validar dirección
  if (!usuario.direccion || usuario.direccion.trim().length < 5) {
    errors.direccion = "La dirección debe tener al menos 5 caracteres";
  }
  
  // Validar password (solo si se proporciona)
  if (usuario.password) {
    const passwordValidation = validarPassword(usuario.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.join(". ");
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
