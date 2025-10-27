/**
 * Objeto contenedor para la lógica del componente DeliveryForm.
 * Se adjunta a 'window' para ser accesible globalmente en el entorno de pruebas.
 */
window.DeliveryFormLogic = (() => {
  // Almacén para los datos de regiones, que será mockeado en tests.
  let regionesMap = {};

  /**
   * Permite inyectar el mapa de regiones y comunas.
   * @param {object} map - El objeto regionesYComunas a utilizar.
   */
  const setRegionesYComunas = (map) => {
    regionesMap = map;
  };

  /**
   * Simula la lógica dentro del componente para obtener la lista de comunas disponibles
   * basada en la región seleccionada.
   *
   * @param {string} selectedRegionKey - La clave de la región seleccionada (ej: "13").
   * @returns {string[]} Un array de nombres de comunas o un array vacío.
   */
  const getComunasDisponibles = (selectedRegionKey) => {
    if (selectedRegionKey && regionesMap[selectedRegionKey]) {
      return regionesMap[selectedRegionKey].comunas || [];
    }
    return [];
  };

  /**
   * Simula la lógica de 'handleRegionChange'.
   * Su función es tomar el valor de la nueva región y devolver la función
   * que se usaría dentro de 'setFormData'.
   * CRUCIAL: Reinicia la comuna a "" y actualiza la región.
   *
   * @param {string} newRegion - La nueva clave de región.
   * @param {object} prevData - El estado anterior del formData.
   * @returns {object} El nuevo estado del formData.
   */
  const handleRegionChangeLogic = (newRegion, prevData) => {
    // Este es el cuerpo de la función que se pasa a setFormData(prevData => {...})
    return {
      ...prevData,
      region: newRegion,
      comuna: "", // **Lógica clave a probar: la comuna debe borrarse**
    };
  };

  return {
    setRegionesYComunas,
    getComunasDisponibles,
    handleRegionChangeLogic,
  };
})();
