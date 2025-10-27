


describe('UserFiltersLogic', function() {
    
    // =========================================================================
    // CONFIGURACIÓN Y HELPERS
    // =========================================================================
    
    /**
     * Helper: Crea un mock de evento simulando la estructura de React
     * @param {*} value - Valor que se asignará a e.target.value
     * @returns {Object} Objeto mock con estructura {target: {value: value}}
     */
    function mockEvent(value) {
        return {
            target: {
                value: value
            }
        };
    }

    var callbackSpy;

    beforeEach(function() {
        // Reiniciar el spy callback antes de cada prueba
        callbackSpy = jasmine.createSpy('callbackSpy');
        
        // Verificar que UserFiltersLogic esté cargado globalmente
        expect(window.UserFiltersLogic).toBeDefined('UserFiltersLogic debe estar definido en window');
    });

    // =========================================================================
    // PRUEBAS PRINCIPALES (5 pruebas en total)
    // =========================================================================
    
    // Test 1: Verificar que handleSearchChange funciona correctamente con búsqueda de usuarios
    it('handleSearchChange debe llamar al callback con el término de búsqueda cuando el evento es válido', function() {
        // Arrange: Preparar datos de prueba (búsqueda típica de usuario)
        var terminoBusqueda = 'ana.garcia';
        var evento = mockEvent(terminoBusqueda);

        // Act: Ejecutar la función
        window.UserFiltersLogic.handleSearchChange(evento, callbackSpy);

        // Assert: Verificar comportamiento esperado
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledWith(terminoBusqueda);
        
        // Probar también con cadena vacía (limpieza de búsqueda)
        callbackSpy.calls.reset();
        var eventoBusquedaVacia = mockEvent('');
        window.UserFiltersLogic.handleSearchChange(eventoBusquedaVacia, callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith('');
    });

    // Test 2: Verificar que handleRolChange procesa correctamente diferentes roles
    it('handleRolChange debe llamar al callback con diferentes valores de rol (admin, usuario, todos)', function() {
        // Probar rol "admin"
        var eventoAdmin = mockEvent('admin');
        window.UserFiltersLogic.handleRolChange(eventoAdmin, callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith('admin');

        // Resetear spy
        callbackSpy.calls.reset();

        // Probar rol "usuario"
        var eventoUsuario = mockEvent('usuario');
        window.UserFiltersLogic.handleRolChange(eventoUsuario, callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith('usuario');

        // Resetear spy
        callbackSpy.calls.reset();

        // Probar valor "todos" (sin filtro)
        var eventoTodos = mockEvent('todos');
        window.UserFiltersLogic.handleRolChange(eventoTodos, callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith('todos');
    });

    // Test 3: Verificar que formatRolDisplay capitaliza correctamente los roles
    it('formatRolDisplay debe capitalizar la primera letra del rol correctamente', function() {
        // Casos de uso comunes
        expect(window.UserFiltersLogic.formatRolDisplay('admin')).toEqual('Admin');
        expect(window.UserFiltersLogic.formatRolDisplay('editor')).toEqual('Editor');
        expect(window.UserFiltersLogic.formatRolDisplay('usuario')).toEqual('Usuario');
        
        // Caso borde: cadena vacía
        expect(window.UserFiltersLogic.formatRolDisplay('')).toEqual('');
        
        // Caso borde: ya capitalizado
        expect(window.UserFiltersLogic.formatRolDisplay('SuperUser')).toEqual('SuperUser');
    });

    // Test 4: Verificar robustez - los handlers no deben fallar con eventos null o callbacks inválidos
    it('Todos los handlers deben ser robustos ante eventos null o callbacks inválidos sin generar errores', function() {
        // Probar con evento null
        expect(function() {
            window.UserFiltersLogic.handleSearchChange(null, callbackSpy);
            window.UserFiltersLogic.handleRolChange(null, callbackSpy);
        }).not.toThrow();

        // Probar con evento sin target
        var eventoInvalido = {};
        expect(function() {
            window.UserFiltersLogic.handleSearchChange(eventoInvalido, callbackSpy);
            window.UserFiltersLogic.handleRolChange(eventoInvalido, callbackSpy);
        }).not.toThrow();

        // Probar con callback null
        var evento = mockEvent('test');
        expect(function() {
            window.UserFiltersLogic.handleSearchChange(evento, null);
            window.UserFiltersLogic.handleRolChange(evento, null);
        }).not.toThrow();

        // Verificar que no se haya llamado al callback con eventos null
        expect(callbackSpy).not.toHaveBeenCalled();
        
        // Probar formatRolDisplay con valores no válidos
        expect(window.UserFiltersLogic.formatRolDisplay(null)).toEqual('');
        expect(window.UserFiltersLogic.formatRolDisplay(undefined)).toEqual('');
        expect(window.UserFiltersLogic.formatRolDisplay(123)).toEqual('');
    });

    // Test 5: Verificar que handleLimpiarClick funciona correctamente
    it('handleLimpiarClick debe llamar al callback sin argumentos y soportar múltiples llamadas', function() {
        // Primera llamada
        window.UserFiltersLogic.handleLimpiarClick(callbackSpy);
        expect(callbackSpy).toHaveBeenCalledWith();
        expect(callbackSpy).toHaveBeenCalledTimes(1);

        // Llamadas adicionales
        window.UserFiltersLogic.handleLimpiarClick(callbackSpy);
        window.UserFiltersLogic.handleLimpiarClick(callbackSpy);
        expect(callbackSpy).toHaveBeenCalledTimes(3);

        // Verificar robustez con callback null
        expect(function() {
            window.UserFiltersLogic.handleLimpiarClick(null);
        }).not.toThrow();

        // Verificar robustez con callback no-función
        expect(function() {
            window.UserFiltersLogic.handleLimpiarClick(undefined);
            window.UserFiltersLogic.handleLimpiarClick('no-funcion');
            window.UserFiltersLogic.handleLimpiarClick({ action: 'limpiar' });
        }).not.toThrow();
    });

});