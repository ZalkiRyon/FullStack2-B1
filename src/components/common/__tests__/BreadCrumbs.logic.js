
/**
 * Objeto contenedor para la lógica del componente Breadcrumbs.
 * Se adjunta a 'window' para ser accesible globalmente en el entorno de pruebas.
 */
window.BreadcrumbsLogic = (() => {
  // Almacén para la función externa getProductosFromStorage, que será mockeada en tests.
  let getProductosStorageFn = () => [];

  /**
   * Permite inyectar la función getProductosFromStorage al inicio de las pruebas.
   * @param {function} fn - La función a utilizar para obtener los productos.
   */
  const setProductosStorageFn = (fn) => {
    getProductosStorageFn = fn;
  };

  /**
   * Obtiene el nombre del producto por su ID, usando la función inyectada.
   * Si el producto no se encuentra, retorna un nombre por defecto.
   *
   * @param {string} id - El ID del producto.
   * @returns {string} El nombre del producto o un placeholder.
   */
  const getProductNameById = (id) => {
    const productos = getProductosStorageFn();
    // Nota: El componente original usa "==" para comparación, se mantiene aquí.
    const producto = productos.find((p) => String(p.id) == String(id));

    return producto ? producto.nombre : `Producto ${id}`;
  };

  /**
   * Formatea un valor de path (ej: 'accesorios', '123') en el nombre visible del breadcrumb.
   * Aplica reglas especiales para IDs de producto.
   *
   * @param {string} value - El valor actual del path segment.
   * @param {number} index - El índice del segmento en el array pathnames.
   * @param {string[]} pathnames - El array completo de segmentos del path.
   * @returns {string} El nombre formateado para mostrar en el breadcrumb.
   */
  const formatBreadcrumbName = (value, index, pathnames) => {
    const previousValue = pathnames[index - 1];

    // 1. Regla para IDs de Producto (ej: /productos/123)
    if (previousValue === "productos" && /^\d+$/.test(value)) {
      // Si el valor es un dígito y el segmento anterior es 'productos', busca el nombre.
      const productName = getProductNameById(value);
      return productName;
    }

    // 2. Regla General de Formato
    // Capitaliza la primera letra y reemplaza guiones por espacios (ej: 'quienes-somos' -> 'Quienes somos')
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
    }

    return value; // Retorna el valor si está vacío o es inválido
  };

  return {
    setProductosStorageFn,
    getProductNameById,
    formatBreadcrumbName,
  };
})();
