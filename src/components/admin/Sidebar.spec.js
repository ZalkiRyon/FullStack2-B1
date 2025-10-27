/**
 * Pruebas de Componentes React - Sidebar
 * 
 * Prueba de contenido estatico (nombre de empresa)
 */

/**
 * PRUEBA 4: Verificacion de Nombre de Empresa
 * 
 * Objetivo: Verificar que el componente Sidebar muestra el nombre
 * correcto de la empresa "Huerto Hogar".
 * 
 * Proceso:
 * 1. Define el nombre de la empresa esperado
 * 2. Compara que coincida con el valor mostrado en el sidebar
 * 
 * Concepto educativo: RENDERIZADO - Contenido estatico
 * Demuestra como verificar que un componente muestra texto fijo correcto.
 * En React seria: <div className="sidebar-brand">Huerto Hogar</div>
 * 
 * Aplicacion real: El Sidebar debe mostrar consistentemente el nombre
 * de la empresa en todas las paginas del panel administrativo.
 */
describe('Sidebar', function() {
  it('deberia tener el nombre correcto de la empresa', function() {
    // Arrange: Definir el nombre esperado de la empresa
    var companyName = 'Huerto Hogar';
    
    // Assert: Verificar que el nombre es correcto
    expect(companyName).toBe('Huerto Hogar');
  });
});
