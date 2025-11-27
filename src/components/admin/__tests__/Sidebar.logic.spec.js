// src/utils/Sidebar.logic.spec.js

describe("SidebarLogic", () => {
  // Inicialización de la lógica para asegurar acceso en el entorno de Karma
  let logic;

  beforeAll(() => {
    // Si Karma está configurado correctamente, window.SidebarLogic ya estará cargado.
    logic = window.SidebarLogic;
    if (!logic) {
      throw new Error(
        "SidebarLogic no está definido. Asegura la carga correcta de Sidebar.logic.js en karma.conf.js."
      );
    }
  });

  // Mock de datos para las pruebas
  const mockUserAdmin = {
    nombre: "Juan",
    apellido: "Pérez",
    roleNombre: "admin",
  };
  const mockUserStandard = {
    nombre: "Ana",
    apellido: "Gómez",
    roleNombre: "user", // Rol no 'admin'
  };

  // =========================================================================
  // Test Suite para getUserDisplayInfo
  // =========================================================================
  describe("getUserDisplayInfo", () => {
    // Caso de prueba 1 (Entrada Válida): Usuario con rol 'admin'.
    it("debe retornar 'Admin' y el nombre completo correctamente para un administrador", () => {
      // Act
      const result = logic.getUserDisplayInfo(mockUserAdmin);

      // Assert
      expect(result.userRole).toBe("Admin");
      expect(result.userName).toBe("Juan Pérez");
    });

    // Caso de prueba 2 (Caso Estándar): Usuario con otro rol ('user').
    it("debe retornar 'Usuario' para cualquier rol que NO sea 'admin'", () => {
      // Act
      const result = logic.getUserDisplayInfo(mockUserStandard);

      // Assert
      expect(result.userRole).toBe("Usuario");
      expect(result.userName).toBe("Ana Gómez");
    });

    // Caso de prueba 3 (Caso Borde/Nulo): Objeto de usuario nulo o incompleto.
    it("debe retornar 'Usuario' y el placeholder '{Nombre Usuario}' si el objeto de usuario es null o undefined", () => {
      // Act
      const resultNull = logic.getUserDisplayInfo(null);
      const resultUndefined = logic.getUserDisplayInfo(undefined);
      const resultVacio = logic.getUserDisplayInfo({}); // Objeto vacío

      // Assert para null
      expect(resultNull.userRole).toBe("Usuario");
      expect(resultNull.userName).toBe("{Nombre Usuario}");

      // Assert para undefined
      expect(resultUndefined.userRole).toBe("Usuario");
      expect(resultUndefined.userName).toBe("{Nombre Usuario}");

      // Assert para objeto vacío (se comporta como no-admin y sin nombre)
      expect(resultVacio.userRole).toBe("Usuario");
      expect(resultVacio.userName).toBe("undefined undefined"); // Comportamiento del template literal
    });
  });

  // =========================================================================
  // Test Suite para handleCerrarSesionLogic
  // =========================================================================
  describe("handleCerrarSesionLogic", () => {
    let mockLogout;
    let mockNavigate;

    beforeEach(() => {
      // Configuramos Spies para simular las dependencias
      mockLogout = jasmine.createSpy("logout");
      mockNavigate = jasmine.createSpy("navigate");
    });

    // Caso de prueba 1 (Entrada Válida): El usuario confirma (confirmFn retorna true).
    it("debe llamar a 'logout' y 'navigate' si la función de confirmación retorna true", () => {
      // Arrange: La confirmación devuelve true
      const mockConfirmFn = jasmine
        .createSpy("confirmFn")
        .and.returnValue(true);

      // Act
      logic.handleCerrarSesionLogic(mockLogout, mockNavigate, mockConfirmFn);

      // Assert
      expect(mockConfirmFn).toHaveBeenCalledTimes(1);
      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    // Caso de prueba 2 (Entrada Inválida): El usuario cancela (confirmFn retorna false).
    it("NO debe llamar a 'logout' ni 'navigate' si la función de confirmación retorna false", () => {
      // Arrange: La confirmación devuelve false
      const mockConfirmFn = jasmine
        .createSpy("confirmFn")
        .and.returnValue(false);

      // Act
      logic.handleCerrarSesionLogic(mockLogout, mockNavigate, mockConfirmFn);

      // Assert
      expect(mockConfirmFn).toHaveBeenCalledTimes(1);
      expect(mockLogout).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    // Caso de prueba 3 (Caso Borde): La función de confirmación lanza un error (simulando un error inusual).
    it("debe manejar el caso donde la confirmación retorna un valor falsy diferente a false (ej: 0, '') y no debe llamar a logout/navigate", () => {
      // Arrange: La confirmación devuelve 0 (valor falsy)
      const mockConfirmFn = jasmine.createSpy("confirmFn").and.returnValue(0);

      // Act
      logic.handleCerrarSesionLogic(mockLogout, mockNavigate, mockConfirmFn);

      // Assert
      expect(mockConfirmFn).toHaveBeenCalledTimes(1);
      // El 'if (confirmFn(message))' en la lógica evalúa 0 como false, por lo tanto NO llama a logout/navigate.
      expect(mockLogout).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
