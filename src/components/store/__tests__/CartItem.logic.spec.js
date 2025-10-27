describe("CartItemLogic", () => {
  let logic;
  let mockProductImages;

  beforeAll(() => {
    logic = window.CartItemLogic;
    if (!logic) {
      throw new Error(
        "ERROR DE CARGA: 'CartItemLogic' es indefinido. Revisa karma.conf.js."
      );
    }

    // Definimos el mock de imágenes para la prueba
    mockProductImages = {
      manzana: "/img/manzana.jpg",
      pera: "/img/pera.jpg",
      default: "/img/placeholder.jpg",
    };

    // Inyectamos el mock de datos en la lógica
    logic.setProductImagesMap(mockProductImages);
  });

  // =========================================================================
  // Test Suite para getProductImageSrc
  // =========================================================================
  describe("getProductImageSrc", () => {
    it("debe retornar la ruta específica de la imagen si la clave es encontrada", () => {
      const result = logic.getProductImageSrc("manzana");
      expect(result).toBe("/img/manzana.jpg");
    });

    it("debe retornar la imagen 'default' si la clave no existe", () => {
      const result = logic.getProductImageSrc("nonexistent_item");
      expect(result).toBe(mockProductImages["default"]);
    });

    it("debe retornar la imagen 'default' si la clave es nula o vacía", () => {
      expect(logic.getProductImageSrc(null)).toBe("/img/placeholder.jpg");
      expect(logic.getProductImageSrc("")).toBe("/img/placeholder.jpg");
    });
  });

  // =========================================================================
  // Test Suite para calculateAndFormatSubtotal
  // =========================================================================
  describe("calculateAndFormatSubtotal", () => {
    it("debe calcular el subtotal correctamente y aplicar formato de miles", () => {
      // 15000 * 5 = 75000
      const subtotal = logic.calculateAndFormatSubtotal(15000, 5);
      expect(subtotal).toBe("75.000");
    });

    it("debe manejar cantidades unitarias (x1) y aplicar formato", () => {
      const subtotal = logic.calculateAndFormatSubtotal(99990, 1);
      expect(subtotal).toBe("99.990");
    });

    it("debe retornar '0' si la cantidad o el precio es cero", () => {
      expect(logic.calculateAndFormatSubtotal(100, 0)).toBe("0");
      expect(logic.calculateAndFormatSubtotal(0, 5)).toBe("0");
    });

    it("debe retornar '0' para entradas inválidas (NaN)", () => {
      expect(logic.calculateAndFormatSubtotal(100, NaN)).toBe("0");
      expect(logic.calculateAndFormatSubtotal(null, 5)).toBe("0");
    });
  });
});
