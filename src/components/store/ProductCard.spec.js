/**
 * Pruebas de Componentes React - ProductCard
 * 
 * Prueba de formateo de datos (precio)
 */

/**
 * PRUEBA 3: Formateo de Precio en Formato Chileno
 * 
 * Objetivo: Verificar que los precios se formateen correctamente
 * usando el formato chileno (punto como separador de miles).
 * 
 * Proceso:
 * 1. Toma un precio numérico (1500)
 * 2. Lo formatea usando toLocaleString con locale 'es-CL'
 * 3. Verifica que el resultado sea "1.500" (con punto, no coma)
 * 
 * Concepto educativo: RENDERIZADO - Formateo de datos
 * Demuestra cómo formatear números antes de mostrarlos en la UI.
 * En React se usaría: <span>${precio.toLocaleString('es-CL')}</span>
 * 
 * Aplicación real: El componente ProductCard debe mostrar precios
 * como "$1.200.000" en lugar de "1200000" para mejor legibilidad.
 */
describe('ProductCard', function() {
  it('deberia formatear el precio correctamente', function() {
    // Arrange: Precio sin formato
    var price = 1500;
    
    // Act: Aplicar formato chileno (punto como separador de miles)
    var formattedPrice = price.toLocaleString('es-CL');
    
    // Assert: Verificar que el formato es correcto
    expect(formattedPrice).toBe('1.500');
  });
});
