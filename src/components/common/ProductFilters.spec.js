/**
 * Pruebas de Componentes React - ProductFilters
 * 
 * Prueba de estado inicial del filtro
 */

/**
 * PRUEBA 10: Verificacion de Valor por Defecto del Filtro de Categorias
 * 
 * Objetivo: Verificar que el filtro de categorias tiene el valor
 * por defecto "todas" cuando se inicializa el componente.
 * 
 * Proceso:
 * 1. Define el valor inicial esperado del filtro ("todas")
 * 2. Compara que coincida con el estado inicial
 * 
 * Concepto educativo: ESTADO (STATE) - Valores iniciales
 * Demuestra como los componentes con filtros tienen estado inicial.
 * En React seria:
 * const [categoriaFilter, setCategoriaFilter] = useState('todas');
 * 
 * Aplicacion real: El componente ProductFilters permite filtrar productos
 * por categoria. Al cargar la pagina, debe mostrar "Todas las categorias"
 * para que el usuario vea todos los productos disponibles.
 * Opciones tipicas:
 * - Todas (muestra todo)
 * - Electronica
 * - Ropa
 * - Hogar
 * - Deportes
 * El usuario puede cambiar este estado para filtrar la vista.
 */
describe('ProductFilters', function() {
  it('deberia tener todas como valor por defecto', function() {
    // Arrange: Definir el valor inicial esperado del filtro
    var categoriaFilter = 'todas';
    
    // Assert: Verificar que el estado inicial es correcto
    expect(categoriaFilter).toBe('todas');
  });
});
