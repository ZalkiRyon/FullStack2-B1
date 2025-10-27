describe("BreadcrumbsLogic", () => {
  let logic;
  let mockProductos;

  beforeAll(() => {
    logic = window.BreadcrumbsLogic;
    if (!logic) {
      throw new Error("ERROR DE CARGA: 'BreadcrumbsLogic' es indefinido. Revisa karma.conf.js.");
    }
    
    // 1. Definimos el mock de productos para todas las pruebas
    mockProductos = [
      { id: 101, nombre: "MANZANA" },
      { id: 202, nombre: "PERA" },
      { id: 303, nombre: "LECHE" },
    ];
    
    // 2. Creamos un spy para la función de almacenamiento (simulando getProductosFromStorage)
    const mockStorageFn = jasmine.createSpy('getProductosFromStorage').and.returnValue(mockProductos);
    
    // 3. Inyectamos la función mockeada en la lógica
    logic.setProductosStorageFn(mockStorageFn);
  });

  // =========================================================================
  // Test Suite para getProductNameById
  // =========================================================================
  describe("getProductNameById", () => {
    
    it("debe retornar el nombre del producto si el ID existe (comparación de strings/numbers)", () => {
      // El ID 202 existe
      const result = logic.getProductNameById(202); 
      expect(result).toBe("PERA");
    });
    
    it("debe manejar la comparación cuando el ID es un string", () => {
      // El ID '303' existe
      const result = logic.getProductNameById("303"); 
      expect(result).toBe("LECHE");
    });

    it("debe retornar un nombre por defecto si el ID no existe", () => {
      // El ID 999 no existe
      const result = logic.getProductNameById(999);
      expect(result).toBe("Producto 999");
    });
    
    it("debe retornar un nombre por defecto si el ID es nulo o inválido", () => {
      const result = logic.getProductNameById(null);
      expect(result).toBe("Producto null");
    });
  });

  // =========================================================================
  // Test Suite para formatBreadcrumbName
  // =========================================================================
  describe("formatBreadcrumbName", () => {
    
    // Caso de prueba 1: Ruta estándar (Capitalización y reemplazo de guiones)
    it("debe capitalizar la primera letra y reemplazar guiones por espacios", () => {
      const pathnames = ["quienes-somos"];
      const result = logic.formatBreadcrumbName("quienes-somos", 0, pathnames);
      expect(result).toBe("Quienes somos");
    });
    
    // Caso de prueba 2: Ruta estándar (Solo capitalización)
    it("debe capitalizar rutas de una sola palabra", () => {
      const pathnames = ["contacto"];
      const result = logic.formatBreadcrumbName("contacto", 0, pathnames);
      expect(result).toBe("Contacto");
    });
    
    // Caso de prueba 3: Segmento de ID de producto ENCONTRADO
    it("debe retornar el nombre real del producto si el segmento anterior es 'productos' y el valor es un ID conocido", () => {
      const pathnames = ["productos", "101"];
      const result = logic.formatBreadcrumbName("101", 1, pathnames);
      expect(result).toBe("MANZANA");
    });

    // Caso de prueba 4: Segmento de ID de producto NO ENCONTRADO
    it("debe retornar el placeholder 'Producto ID' si es un ID pero el producto no existe", () => {
      const pathnames = ["productos", "999"];
      const result = logic.formatBreadcrumbName("999", 1, pathnames);
      expect(result).toBe("Producto 999");
    });
    
    // Caso de prueba 5: Segmento NO es un ID aunque esté después de 'productos' (caso borde)
    it("debe aplicar formato estándar si el valor NO es un dígito, incluso después de 'productos'", () => {
      const pathnames = ["productos", "reviews"];
      const result = logic.formatBreadcrumbName("reviews", 1, pathnames);
      expect(result).toBe("Reviews");
    });

    // Caso de prueba 6: Segmento es un número pero el anterior NO es 'productos' (ej: /usuarios/123)
    it("debe aplicar formato estándar si es un número, pero el segmento anterior no es 'productos'", () => {
      const pathnames = ["usuarios", "456"];
      const result = logic.formatBreadcrumbName("456", 1, pathnames);
      
      // El formato estándar para un número es capitalizar el primer carácter (4)
      expect(result).toBe("456"); 
    });
  });
});