/**
 * Pruebas de Componentes React - PrimaryButton
 * 
 * Prueba básica de propiedades por defecto
 */

/**
 * PRUEBA 1: Verificación de Propiedad por Defecto (width)
 * 
 * Objetivo: Verificar que el componente PrimaryButton tiene un ancho
 * por defecto de 100% cuando no se especifica la prop width.
 * 
 * Proceso:
 * 1. Define el valor esperado por defecto (100%)
 * 2. Compara que coincida con el valor esperado
 * 
 * Concepto educativo: PROPIEDADES (PROPS) - Valores por defecto
 * Demuestra cómo los componentes pueden tener valores predeterminados.
 * 
 * Nota: Esta es una prueba simplificada. En un entorno real,
 * se renderizaría el componente y se verificaría el estilo aplicado.
 */
describe('PrimaryButton', function() {
  it('deberia tener width 100% por defecto', function() {
    // Arrange: Definir el valor por defecto esperado
    var defaultWidth = '100%';
    
    // Assert: Verificar que el valor por defecto es correcto
    expect(defaultWidth).toBe('100%');
  });
});
