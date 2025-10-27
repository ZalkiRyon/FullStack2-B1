describe("DeliveryFormLogic", () => {
  let logic;
  let mockRegiones;

  beforeAll(() => {
    logic = window.DeliveryFormLogic;
    if (!logic) {
      throw new Error(
        "ERROR DE CARGA: 'DeliveryFormLogic' es indefinido. Revisa karma.conf.js."
      );
    }

    // Definimos el mock de regiones para la prueba
    mockRegiones = {
      5: {
        nombre: "Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué"],
      },
      13: {
        nombre: "Metropolitana",
        comunas: ["Santiago", "Providencia", "Las Condes"],
      },
      1: { nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio"] },
    };

    // Inyectamos el mock de datos en la lógica
    logic.setRegionesYComunas(mockRegiones);
  });

  // =========================================================================
  // Test Suite para getComunasDisponibles
  // =========================================================================
  describe("getComunasDisponibles", () => {
    it("debe retornar la lista de comunas para una región válida ('13' Metropolitana)", () => {
      const comunas = logic.getComunasDisponibles(13);
      expect(comunas.length).toBe(3);
      expect(comunas).toContain("Santiago");
      expect(comunas).toContain("Las Condes");
    });

    it("debe retornar la lista de comunas para otra región válida ('05' Valparaíso)", () => {
      const comunas = logic.getComunasDisponibles(5);
      expect(comunas.length).toBe(3);
      expect(comunas).toContain("Viña del Mar");
    });

    it("debe retornar un array vacío si la región seleccionada no existe", () => {
      const comunas = logic.getComunasDisponibles("99");
      expect(comunas.length).toBe(0);
    });

    it("debe retornar un array vacío si la región es nula o string vacío", () => {
      expect(logic.getComunasDisponibles(null).length).toBe(0);
      expect(logic.getComunasDisponibles("").length).toBe(0);
    });
  });

  // =========================================================================
  // Test Suite para handleRegionChangeLogic
  // =========================================================================
  describe("handleRegionChangeLogic", () => {
    const prevFormData = {
      name: "Juan",
      region: "05",
      comuna: "Viña del Mar", // Comuna seleccionada
      direction: "Calle Falsa 123",
    };

    it("debe actualizar la región con el nuevo valor", () => {
      const newRegion = 13;
      const newFormData = logic.handleRegionChangeLogic(
        newRegion,
        prevFormData
      );

      expect(newFormData.region).toBe(13);
    });

    it("debe establecer la comuna como un string vacío, borrando la seleccion previa", () => {
      const newRegion = 13;
      const newFormData = logic.handleRegionChangeLogic(
        newRegion,
        prevFormData
      );

      // **CRUCIAL: La comuna debe ser borrada al cambiar la región**
      expect(newFormData.comuna).toBe("");
    });

    it("debe mantener intactos todos los demás campos del formulario (inmutabilidad)", () => {
      const newRegion = 1;
      const newFormData = logic.handleRegionChangeLogic(
        newRegion,
        prevFormData
      );

      expect(newFormData.name).toBe(prevFormData.name);
      expect(newFormData.direction).toBe(prevFormData.direction);
    });

    it("debe manejar correctamente el caso en que la nueva región es vacía ('Seleccionar región...')", () => {
      const newRegion = "";
      const newFormData = logic.handleRegionChangeLogic(
        newRegion,
        prevFormData
      );

      expect(newFormData.region).toBe("");
      expect(newFormData.comuna).toBe("");
    });
  });
});
