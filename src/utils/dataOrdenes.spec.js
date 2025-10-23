// Pruebas unitarias para gestión de órdenes
describe('Data Ordenes - Operations', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getOrdenesFromStorage', () => {
    it('debería retornar un array vacío cuando no hay órdenes', () => {
      // Act
      const ordenes = getOrdenesFromStorage();

      // Assert
      expect(Array.isArray(ordenes)).toBe(true);
      expect(ordenes.length).toBe(0);
    });

    it('debería retornar todas las órdenes almacenadas', () => {
      // Arrange
      const ordenesTest = [
        { 
          id: 1, 
          numeroOrden: 'SO1001', 
          clienteId: 4, 
          estado: 'Enviado',
          monto: 15000,
          detalles: []
        },
        { 
          id: 2, 
          numeroOrden: 'SO1002', 
          clienteId: 5, 
          estado: 'Pendiente',
          monto: 8000,
          detalles: []
        }
      ];
      localStorage.setItem('ordenes', JSON.stringify(ordenesTest));

      // Act
      const ordenes = getOrdenesFromStorage();

      // Assert
      expect(ordenes.length).toBe(2);
      expect(ordenes[0].numeroOrden).toBe('SO1001');
      expect(ordenes[1].estado).toBe('Pendiente');
    });
  });

  describe('getOrdenById', () => {
    it('debería retornar una orden específica por ID', () => {
      // Arrange
      const ordenesTest = [
        { id: 1, numeroOrden: 'SO1001', monto: 15000 },
        { id: 2, numeroOrden: 'SO1002', monto: 8000 }
      ];
      localStorage.setItem('ordenes', JSON.stringify(ordenesTest));

      // Act
      const orden = getOrdenById(2);

      // Assert
      expect(orden).toBeDefined();
      expect(orden.numeroOrden).toBe('SO1002');
      expect(orden.monto).toBe(8000);
    });

    it('debería retornar null si la orden no existe', () => {
      // Arrange
      localStorage.setItem('ordenes', JSON.stringify([]));

      // Act
      const orden = getOrdenById(999);

      // Assert
      expect(orden).toBeNull();
    });
  });

  describe('getOrdenesByCliente', () => {
    it('debería retornar todas las órdenes de un cliente específico', () => {
      // Arrange
      const ordenesTest = [
        { id: 1, clienteId: 4, numeroOrden: 'SO1001', monto: 15000 },
        { id: 2, clienteId: 5, numeroOrden: 'SO1002', monto: 8000 },
        { id: 3, clienteId: 4, numeroOrden: 'SO1003', monto: 12000 }
      ];
      localStorage.setItem('ordenes', JSON.stringify(ordenesTest));

      // Act
      const ordenesCliente = getOrdenesByCliente(4);

      // Assert
      expect(ordenesCliente.length).toBe(2);
      expect(ordenesCliente[0].clienteId).toBe(4);
      expect(ordenesCliente[1].clienteId).toBe(4);
    });

    it('debería retornar array vacío si el cliente no tiene órdenes', () => {
      // Arrange
      const ordenesTest = [
        { id: 1, clienteId: 4, numeroOrden: 'SO1001' }
      ];
      localStorage.setItem('ordenes', JSON.stringify(ordenesTest));

      // Act
      const ordenesCliente = getOrdenesByCliente(999);

      // Assert
      expect(ordenesCliente.length).toBe(0);
    });

    it('debería ordenar las órdenes por fecha descendente', () => {
      // Arrange
      const ordenesTest = [
        { id: 1, clienteId: 4, fecha: '2024-06-01', numeroOrden: 'SO1001' },
        { id: 2, clienteId: 4, fecha: '2024-06-15', numeroOrden: 'SO1002' },
        { id: 3, clienteId: 4, fecha: '2024-06-10', numeroOrden: 'SO1003' }
      ];
      localStorage.setItem('ordenes', JSON.stringify(ordenesTest));

      // Act
      const ordenesCliente = getOrdenesByCliente(4);

      // Assert
      expect(ordenesCliente[0].fecha).toBe('2024-06-15'); // Más reciente primero
      expect(ordenesCliente[1].fecha).toBe('2024-06-10');
      expect(ordenesCliente[2].fecha).toBe('2024-06-01');
    });
  });

  describe('calcularMontoTotal', () => {
    it('debería calcular correctamente el monto total de una orden', () => {
      // Arrange
      const detalles = [
        { cantidad: 5, precioUnitario: 1000, subtotal: 5000 },
        { cantidad: 3, precioUnitario: 1500, subtotal: 4500 },
        { cantidad: 2, precioUnitario: 800, subtotal: 1600 }
      ];

      // Act
      const total = calcularMontoTotal(detalles);

      // Assert
      expect(total).toBe(11100);
    });

    it('debería retornar 0 para una orden sin detalles', () => {
      // Act
      const total = calcularMontoTotal([]);

      // Assert
      expect(total).toBe(0);
    });
  });
});

// Funciones simplificadas para pruebas
function getOrdenesFromStorage() {
  return JSON.parse(localStorage.getItem('ordenes') || '[]');
}

function getOrdenById(id) {
  const ordenes = getOrdenesFromStorage();
  return ordenes.find(o => o.id === id) || null;
}

function getOrdenesByCliente(clienteId) {
  const ordenes = getOrdenesFromStorage();
  return ordenes
    .filter(o => o.clienteId === clienteId)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

function calcularMontoTotal(detalles) {
  return detalles.reduce((total, detalle) => total + detalle.subtotal, 0);
}
