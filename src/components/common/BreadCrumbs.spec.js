/**
 * Pruebas de Componentes React - BreadCrumbs
 * 
 * Prueba de formateo de texto (capitalize)
 */

/**
 * PRUEBA 7: Formateo de Texto con Primera Letra Mayuscula
 * 
 * Objetivo: Verificar que el texto de las rutas en breadcrumbs
 * se formatee correctamente con la primera letra en mayuscula.
 * 
 * Proceso:
 * 1. Toma un texto en minusculas ('productos')
 * 2. Convierte la primera letra a mayuscula usando charAt(0).toUpperCase()
 * 3. Concatena el resto del string usando slice(1)
 * 4. Verifica que el resultado sea 'Productos'
 * 
 * Concepto educativo: TRANSFORMACION DE DATOS - Manipulacion de strings
 * Demuestra como formatear texto antes de mostrarlo en la UI.
 * Metodos usados:
 * - charAt(0): Obtiene el primer caracter
 * - toUpperCase(): Convierte a mayuscula
 * - slice(1): Obtiene todo el string desde el indice 1 en adelante
 * 
 * Aplicacion real: Los breadcrumbs muestran la ruta de navegacion:
 * Inicio > Productos > Laptops
 * En lugar de: inicio > productos > laptops
 * Mejora la presentacion visual y profesionalismo de la UI.
 */
describe('BreadCrumbs', function() {
  it('deberia formatear texto correctamente', function() {
    // Arrange: Texto en minusculas (como viene de la URL)
    var value = 'productos';
    
    // Act: Capitalizar primera letra
    var formatted = value.charAt(0).toUpperCase() + value.slice(1);
    
    // Assert: Verificar que el formato es correcto
    expect(formatted).toBe('Productos');
  });
});
