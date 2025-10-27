describe("DiscountProductCardLogic", () => {
  let logic;

  // Mapa de imágenes mock para simular productImages
  const mockProductImages = {
    tomato: "/img/tomato.jpg",
    carrot: "/img/carrot.jpg",
    default: "/img/placeholder.jpg",
  };

  /**
   * Bloque crítico para verificar la carga de la lógica.
   * Si falla aquí, significa que 'DiscountProductCard.logic.js' no se cargó primero.
   */
  beforeAll(() => {
    logic = window.DiscountProductCardLogic;

    if (!logic) {
      // Este error debe ser la primera indicación de fallo.
      throw new Error(
        "ERROR DE CARGA: 'window.DiscountProductCardLogic' es indefinido. " +
          "Verifica que 'DiscountProductCard.logic.js' se lista ANTES que este archivo " +
          "('DiscountProductCard.logic.spec.js') en tu karma.conf.js, y que el path sea correcto."
      );
    }
  });

  // =========================================================================
  // Test Suite para calculateInflatedPrice
  // =========================================================================
  describe("calculateInflatedPrice", () => {
    // La constante ya es accesible a través del objeto 'logic'
    const DISCOUNT = 0.25;

    // Caso 1: Precio que resulta en un número entero.
    it("debe calcular el precio original (inflado) con un 25% de descuento", () => {
      const priceWithDiscount = 750;
      const inflatedPrice = logic.calculateInflatedPrice(priceWithDiscount);

      expect(inflatedPrice).toBe(1000);
      expect(inflatedPrice).toBeCloseTo(priceWithDiscount / (1 - DISCOUNT), 5);
    });

    // Caso 2: Precio que resulta en decimales.
    it("debe calcular correctamente el precio inflado para precios no divisibles", () => {
      const priceWithDiscount = 1000;
      const expected = 1000 / 0.75;
      const inflatedPrice = logic.calculateInflatedPrice(priceWithDiscount);

      expect(inflatedPrice).toBeCloseTo(expected, 5);
    });

    // Caso 3: Valores no válidos.
    it("debe retornar 0 si el precio es cero, nulo o no es un número", () => {
      expect(logic.calculateInflatedPrice(0)).toBe(0);
      expect(logic.calculateInflatedPrice(null)).toBe(0);
      expect(logic.calculateInflatedPrice("string")).toBe(0);
    });
  });

  // =========================================================================
  // Test Suite para getProductImageSrc
  // =========================================================================
  describe("getProductImageSrc", () => {
    // Caso 1: Clave existente.
    it("debe retornar la ruta específica de la imagen si la clave es encontrada", () => {
      const result = logic.getProductImageSrc("carrot", mockProductImages);
      expect(result).toBe("/img/carrot.jpg");
    });

    // Caso 2: Clave inexistente (fallback a 'default').
    it("debe retornar la imagen 'default' si la clave no existe en el mapa", () => {
      const result = logic.getProductImageSrc(
        "nonexistent_product",
        mockProductImages
      );
      expect(result).toBe(mockProductImages["default"]);
    });

    // Caso 3: Clave nula/indefinida.
    it("debe retornar la imagen 'default' si la clave de la imagen es null", () => {
      const resultNull = logic.getProductImageSrc(null, mockProductImages);
      expect(resultNull).toBe("/img/placeholder.jpg");
    });
  });

  // =========================================================================
  // Test Suite para formatPriceCLP
  // =========================================================================
  describe("formatPriceCLP", () => {
    // Caso 1: Formato con miles.
    it("debe formatear el precio usando el separador de miles (punto) y sin decimales", () => {
      const formatted = logic.formatPriceCLP(125000);
      expect(formatted).toBe("125.000");
    });

    // Caso 2: Redondeo de decimales.
    it("debe redondear el precio al entero más cercano (0 decimales)", () => {
      const formatted = logic.formatPriceCLP(1333.67);
      expect(formatted).toBe("1.334");
    });

    // Caso 3: Entrada no numérica.
    it("debe retornar '0' si la entrada no es un número válido", () => {
      expect(logic.formatPriceCLP(NaN)).toBe("0");
    });
  });
});
