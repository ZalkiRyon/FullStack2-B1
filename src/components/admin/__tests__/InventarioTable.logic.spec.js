
describe('InventarioTableLogic', function() {
    var onCallbackSpy;
    var mockProductId;

    beforeEach(function() {
        onCallbackSpy = jasmine.createSpy('onCallbackSpy');
        mockProductId = 101;
    });

    // =========================================================================
    // PRUEBA 1: handleActionClick (Llamada Válida)
    // =========================================================================
    it('handleActionClick: Debería llamar al callback con el ID del producto para una acción válida (onVer)', function() {
        var productoIdEsperado = mockProductId;

        window.InventarioTableLogic.handleActionClick(onCallbackSpy, productoIdEsperado);

        // Verifica que el spy fue llamado con el ID correcto.
        expect(onCallbackSpy).toHaveBeenCalledTimes(1);
        expect(onCallbackSpy).toHaveBeenCalledWith(productoIdEsperado);
    });

    // =========================================================================
    // PRUEBA 2: handleActionClick (Caso Borde: ID nulo o inválido)
    // =========================================================================
    it('handleActionClick: NO debería llamar al callback si el ID del producto es null', function() {
        window.InventarioTableLogic.handleActionClick(onCallbackSpy, null);

        // Verifica que el spy no fue llamado.
        expect(onCallbackSpy).not.toHaveBeenCalled();
    });

    // =========================================================================
    // PRUEBA 3: formatPrice (Valor Válido con Decimales)
    // =========================================================================
    it('formatPrice: Debería formatear un precio numérico a cadena con dos decimales y el símbolo "$"', function() {
        var precioEntrada = 99.9;
        var precioEsperado = '$99.90'; 

        var resultado = window.InventarioTableLogic.formatPrice(precioEntrada);

        // Verifica el formato de moneda.
        expect(resultado).toEqual(precioEsperado);
    });

    // =========================================================================
    // PRUEBA 4: formatPrice (Caso Borde: Precio Cero)
    // =========================================================================
    it('formatPrice: Debería formatear un precio cero correctamente', function() {
        var precioEntrada = 0;
        var precioEsperado = '$0.00'; 

        var resultado = window.InventarioTableLogic.formatPrice(precioEntrada);

        // Verifica el formato de cero.
        expect(resultado).toEqual(precioEsperado);
    });
    
    // =========================================================================
    // PRUEBA 5: formatPrice (Entrada Nula/Inválida)
    // =========================================================================
    it('formatPrice: Debería devolver "$0.00" si el precio de entrada no es un número (ej: null o string)', function() {
        var precioEsperado = '$0.00'; 
        
        var resultadoString = window.InventarioTableLogic.formatPrice('cien');
        var resultadoNull = window.InventarioTableLogic.formatPrice(null);

        // Verifica el manejo de errores/valores nulos.
        expect(resultadoString).toEqual(precioEsperado);
        expect(resultadoNull).toEqual(precioEsperado);
    });
});