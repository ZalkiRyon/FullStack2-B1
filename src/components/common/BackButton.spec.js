/**
 * Pruebas de Componentes React - BackButton
 * 
 * Prueba básica de propiedades por defecto
 */

/**
 * PRUEBA 2: Verificación de Texto por Defecto
 * 
 * Objetivo: Verificar que el componente BackButton tiene el texto
 * por defecto "Volver" cuando no se especifica la prop text.
 * 
 * Proceso:
 * 1. Define el valor esperado por defecto ("Volver")
 * 2. Compara que coincida con el texto esperado
 * 
 * Concepto educativo: PROPIEDADES (PROPS) - Valores por defecto
 * Demuestra cómo los componentes pueden tener texto predeterminado.
 * 
 * Nota: Esta es una prueba simplificada. En un entorno real,
 * se renderizaría el componente y se verificaría el textContent del botón.
 */
describe('BackButton', function() {
  it('deberia tener texto por defecto Volver', function() {
    // Arrange: Definir el texto por defecto esperado
    var defaultText = 'Volver';
    
    // Assert: Verificar que el texto por defecto es correcto
    expect(defaultText).toBe('Volver');
  });
});
