// Se define un objeto global para evitar la redeclaración de variables globales
// y para encapsular la lógica del componente.
window.UserTableLogic = window.UserTableLogic || {};

describe('UserTableLogic', function() {
    var onCallbackSpy;
    var mockUser;

    beforeEach(function() {
        onCallbackSpy = jasmine.createSpy('onCallbackSpy');
        mockUser = { id: 42, nombre: 'Ana', apellido: 'Gómez', role: 'admin' };
    });

    // =========================================================================
    // PRUEBA 1: handleActionClick (Manejo de Acción Válida)
    // =========================================================================
    it('handleActionClick: Debería llamar al callback con el ID del usuario para una acción válida', function() {
        var userIdEsperado = mockUser.id;

        window.UserTableLogic.handleActionClick(onCallbackSpy, userIdEsperado);

        // Verifica que la función de callback (simulando onVer, onEditar, etc.) fue llamada con el ID.
        expect(onCallbackSpy).toHaveBeenCalledTimes(1);
        expect(onCallbackSpy).toHaveBeenCalledWith(userIdEsperado);
    });

    // =========================================================================
    // PRUEBA 2: handleActionClick (Caso Borde: Callback nulo)
    // =========================================================================
    it('handleActionClick: NO debería fallar si el callback es null o undefined', function() {
        var userId = mockUser.id;

        // Se prueba con callback nulo e indefinido para verificar seguridad.
        window.UserTableLogic.handleActionClick(null, userId);
        window.UserTableLogic.handleActionClick(undefined, userId);
        
        // La prueba pasa si no lanza ninguna excepción.
        expect(true).toBe(true); 
    });

    // =========================================================================
    // PRUEBA 3: getFullUserName (Concatenación)
    // =========================================================================
    it('getFullUserName: Debería concatenar correctamente nombre y apellido', function() {
        var nombreCompleto = window.UserTableLogic.getFullUserName(mockUser);
        
        // Verifica la estructura del nombre completo.
        expect(nombreCompleto).toEqual('Ana Gómez');
    });

    // =========================================================================
    // PRUEBA 4: getRoleClassName (Lógica Condicional - Rol Admin)
    // =========================================================================
    it('getRoleClassName: Debería devolver "rolAdmin" para el rol "admin" (case insensitive)', function() {
        var claseAdmin = window.UserTableLogic.getRoleClassName('ADMIN');
        
        // Verifica la clase correcta.
        expect(claseAdmin).toEqual('rolAdmin');
    });

    // =========================================================================
    // PRUEBA 5: getRoleClassName (Lógica Condicional - Rol por Defecto)
    // =========================================================================
    it('getRoleClassName: Debería devolver "rolCliente" para un rol desconocido o nulo', function() {
        var claseDesconocida = window.UserTableLogic.getRoleClassName('supervisor');
        var claseNula = window.UserTableLogic.getRoleClassName(null);
        
        // Verifica la clase por defecto.
        expect(claseDesconocida).toEqual('rolCliente');
        expect(claseNula).toEqual('rolCliente');
    });
});