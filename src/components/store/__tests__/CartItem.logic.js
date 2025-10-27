/**
 * Objeto contenedor para la lógica del componente CartItem.
 * Se adjunta a 'window' para ser accesible globalmente en el entorno de pruebas.
 */
window.CartItemLogic = (() => {
  // Almacén para el mapa de imágenes que será mockeado en tests.
  let productImagesMap = {};

  /**
   * Permite inyectar el mapa de imágenes al inicio de las pruebas.
   * @param {object} map - El objeto productImages a utilizar.
   */
  const setProductImagesMap = (map) => {
    productImagesMap = map;
  };

  /**
   * Obtiene la fuente (src) de la imagen a mostrar, usando un mapa de imágenes
   * y una clave por defecto si la imagen solicitada no se encuentra.
   *
   * @param {string} imageName - La clave de la imagen a buscar (ej: 'tomato').
   * @returns {string} La ruta de la imagen o la ruta 'default'.
   */
  const getProductImageSrc = (imageName) => {
    // Aseguramos que la clave 'default' exista en el mapa inyectado.
    if (!productImagesMap || !productImagesMap["default"]) {
      return "";
    }

    // Retorna la imagen específica o el fallback 'default'.
    return productImagesMap[imageName] || productImagesMap["default"];
  };

  /**
   * Calcula el subtotal de un ítem y lo formatea a la localización chilena (es-CL).
   *
   * @param {number} price - El precio unitario.
   * @param {number} quantity - La cantidad del ítem.
   * @returns {string} El subtotal formateado con separadores de miles, sin símbolo '$'.
   */
  const calculateAndFormatSubtotal = (price, quantity) => {
    const subtotal = price * quantity;

    if (typeof subtotal !== "number" || isNaN(subtotal) || subtotal < 0) {
      return "0";
    }

    // Usar el locale 'es-CL' para formato de miles
    return subtotal.toLocaleString("es-CL");
  };

  return {
    setProductImagesMap,
    getProductImageSrc,
    calculateAndFormatSubtotal,
  };
})();
