// Objeto contenedor para la lógica del Sidebar.
// Se adjunta a `window` para ser accesible globalmente en el entorno de pruebas (Jasmine/Karma).
window.SidebarLogic = (() => {
  /**
   * Calcula el rol y el nombre completo del usuario para su visualización.
   * Esta función es pura: solo depende del objeto 'usuario' de entrada.
   *
   * @param {object | null | undefined} usuario - El objeto de usuario conectado.
   * @returns {{userRole: string, userName: string}} Un objeto con el rol y el nombre formateados.
   */
  const getUserDisplayInfo = (usuario) => {
    // La lógica de determinación del rol (idéntica al componente original)
    const userRole = usuario?.roleNombre === "admin" ? "Admin" : "Usuario";

    // La lógica de determinación del nombre (idéntica al componente original)
    const userName = usuario
      ? `${usuario.nombre} ${usuario.apellido}`
      : "{Nombre Usuario}";

    return { userRole, userName };
  };

  /**
   * Maneja la lógica de cerrar la sesión, incluyendo la confirmación del usuario.
   * NOTA: Esta función DEBE ser llamada por el componente original, inyectando las dependencias.
   *
   * @param {function} logout - Función del contexto de autenticación para cerrar sesión.
   * @param {function} navigate - Función de navegación de React Router (useNavigate) para redirigir.
   * @param {function} confirmFn - Función que simula la ventana de confirmación (ej: window.confirm).
   */
  const handleCerrarSesionLogic = (logout, navigate, confirmFn) => {
    const message = "¿Está seguro que desea cerrar sesión?";

    // Si el usuario acepta (true), se ejecutan las acciones de cierre de sesión.
    if (confirmFn(message)) {
      logout();
      navigate("/"); // Redirigir a la página de inicio
    }
  };

  return {
    getUserDisplayInfo,
    handleCerrarSesionLogic,
  };
})();
