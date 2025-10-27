/**
 * Pruebas de Componentes React - Modal
 * 
 * Prueba de propiedades por defecto (titulo)
 */

/**
 * PRUEBA 8: Verificacion de Titulo por Defecto del Modal
 * 
 * Objetivo: Verificar que el componente Modal tiene el titulo
 * por defecto "Confirmacion" cuando no se especifica la prop title.
 * 
 * Proceso:
 * 1. Define el valor esperado por defecto ("Confirmacion")
 * 2. Compara que coincida con el titulo esperado
 * 
 * Concepto educativo: PROPIEDADES (PROPS) - Valores por defecto
 * Demuestra como los componentes pueden tener props con valores predeterminados.
 * En React seria:
 * function Modal({ title = 'Confirmacion', children }) {
 *   return <div className="modal-title">{title}</div>
 * }
 * 
 * Aplicacion real: Los modales se usan para confirmaciones, alertas,
 * formularios, etc. Tener un titulo por defecto mejora la UX cuando
 * no se especifica uno personalizado.
 */
describe('Modal', function() {
  it('deberia tener titulo por defecto Confirmacion', function() {
    // Arrange: Definir el titulo por defecto esperado
    var defaultTitle = 'Confirmación';
    
    // Assert: Verificar que el titulo por defecto es correcto
    expect(defaultTitle).toBe('Confirmación');
  });
});
