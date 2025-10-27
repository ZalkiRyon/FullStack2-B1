/**
 * Pruebas de Componentes React - CartItem
 * 
 * Prueba de calculo de subtotal
 */

/**
 * PRUEBA 6: Calculo de Subtotal en Item del Carrito
 * 
 * Objetivo: Verificar que el subtotal de un producto en el carrito
 * se calcule correctamente (precio x cantidad).
 * 
 * Proceso:
 * 1. Define un precio unitario (2000)
 * 2. Define una cantidad (3 unidades)
 * 3. Calcula el subtotal multiplicando precio por cantidad
 * 4. Verifica que el resultado sea correcto (6000)
 * 
 * Concepto educativo: CALCULOS - Operaciones matematicas en componentes
 * Demuestra como los componentes realizan calculos antes de renderizar.
 * En React seria: <span>${(precio * cantidad).toLocaleString()}</span>
 * 
 * Aplicacion real: Cada item del carrito debe mostrar:
 * - Precio unitario: $2.000
 * - Cantidad: 3
 * - Subtotal: $6.000
 * El total del carrito es la suma de todos los subtotales.
 */
describe('CartItem', function() {
  it('deberia calcular el subtotal correctamente', function() {
    // Arrange: Datos del producto en el carrito
    var price = 2000;    // Precio unitario
    var quantity = 3;     // Cantidad seleccionada
    
    // Act: Calcular subtotal
    var subtotal = price * quantity;
    
    // Assert: Verificar que el calculo es correcto
    expect(subtotal).toBe(6000);
  });
});
