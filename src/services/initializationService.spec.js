// Pruebas unitarias para el servicio de inicialización
describe('Initialization Service', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  describe('initializeUsuarios', () => {
    it('debería inicializar usuarios si no existen en localStorage', () => {
      // Act
      initializeUsuarios();
      const usuarios = JSON.parse(localStorage.getItem('usuarios'));

      // Assert
      expect(usuarios).toBeDefined();
      expect(usuarios.length).toBeGreaterThan(0);
      expect(usuarios[0].id).toBeDefined();
      expect(usuarios[0].nombre).toBeDefined();
      expect(usuarios[0].email).toBeDefined();
    });

    it('no debería sobrescribir usuarios existentes', () => {
      // Arrange
      const usuariosExistentes = [
        { id: 1, nombre: 'Usuario Existente', email: 'existente@test.com' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

      // Act
      initializeUsuarios();
      const usuarios = JSON.parse(localStorage.getItem('usuarios'));

      // Assert
      expect(usuarios.length).toBe(1);
      expect(usuarios[0].nombre).toBe('Usuario Existente');
    });
  });

  describe('initializeProductos', () => {
    it('debería inicializar productos si no existen', () => {
      // Act
      initializeProductos();
      const productos = JSON.parse(localStorage.getItem('productos'));

      // Assert
      expect(productos).toBeDefined();
      expect(productos.length).toBeGreaterThan(0);
      expect(productos[0].id).toBeDefined();
      expect(productos[0].nombre).toBeDefined();
      expect(productos[0].precio).toBeDefined();
      expect(productos[0].stock).toBeDefined();
    });

    it('no debería sobrescribir productos existentes', () => {
      // Arrange
      const productosExistentes = [
        { id: 1, nombre: 'Producto Existente', precio: 1000 }
      ];
      localStorage.setItem('productos', JSON.stringify(productosExistentes));

      // Act
      initializeProductos();
      const productos = JSON.parse(localStorage.getItem('productos'));

      // Assert
      expect(productos.length).toBe(1);
      expect(productos[0].nombre).toBe('Producto Existente');
    });
  });

  describe('initializeOrdenes', () => {
    it('debería inicializar órdenes si no existen', () => {
      // Act
      initializeOrdenes();
      const ordenes = JSON.parse(localStorage.getItem('ordenes'));

      // Assert
      expect(ordenes).toBeDefined();
      expect(ordenes.length).toBeGreaterThan(0);
      expect(ordenes[0].id).toBeDefined();
      expect(ordenes[0].numeroOrden).toBeDefined();
      expect(ordenes[0].clienteId).toBeDefined();
      expect(ordenes[0].detalles).toBeDefined();
    });

    it('debería validar que las órdenes tengan estructura correcta', () => {
      // Act
      initializeOrdenes();
      const ordenes = JSON.parse(localStorage.getItem('ordenes'));

      // Assert
      ordenes.forEach(orden => {
        expect(orden.id).toBeDefined();
        expect(orden.numeroOrden).toMatch(/^SO\d+$/);
        expect(typeof orden.clienteId).toBe('number');
        expect(Array.isArray(orden.detalles)).toBe(true);
        expect(['Enviado', 'Pendiente', 'Procesando', 'Cancelado']).toContain(orden.estado);
      });
    });
  });

  describe('initializeApp', () => {
    it('debería inicializar todos los datos de la aplicación', () => {
      // Act
      initializeApp();

      // Assert
      const usuarios = localStorage.getItem('usuarios');
      const productos = localStorage.getItem('productos');
      const ordenes = localStorage.getItem('ordenes');

      expect(usuarios).not.toBeNull();
      expect(productos).not.toBeNull();
      expect(ordenes).not.toBeNull();
    });

    it('debería ejecutarse sin errores múltiples veces', () => {
      // Act & Assert
      expect(() => {
        initializeApp();
        initializeApp();
        initializeApp();
      }).not.toThrow();
    });
  });
});

// Funciones simplificadas para pruebas
const usuariosIniciales = [
  { id: 1, nombre: 'Admin', apellido: 'Sistema', email: 'admin@huerto.com', role: 'admin' },
  { id: 2, nombre: 'Vendedor', apellido: 'Tienda', email: 'vendedor@huerto.com', role: 'vendedor' }
];

const productosIniciales = [
  { id: 1, nombre: 'FR001 - Manzanas', precio: 1200, stock: 50, categoria: 'Frutas' },
  { id: 2, nombre: 'VR001 - Zanahorias', precio: 900, stock: 30, categoria: 'Verduras' }
];

const ordenesIniciales = [
  { 
    id: 1, 
    numeroOrden: 'SO1001', 
    clienteId: 4, 
    estado: 'Enviado',
    monto: 15000,
    fecha: '2024-06-01',
    detalles: [
      { productoId: 1, cantidad: 5, precioUnitario: 1200, subtotal: 6000 }
    ]
  }
];

function initializeUsuarios() {
  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
  }
}

function initializeProductos() {
  if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productosIniciales));
  }
}

function initializeOrdenes() {
  if (!localStorage.getItem('ordenes')) {
    localStorage.setItem('ordenes', JSON.stringify(ordenesIniciales));
  }
}

function initializeApp() {
  initializeUsuarios();
  initializeProductos();
  initializeOrdenes();
}
