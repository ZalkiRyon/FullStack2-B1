// Pruebas unitarias para CRUD de productos
describe('Data Productos - CRUD Operations', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getProductosFromStorage', () => {
    it('debería retornar un array vacío cuando no hay productos', () => {
      // Act
      const productos = getProductosFromStorage();

      // Assert
      expect(Array.isArray(productos)).toBe(true);
      expect(productos.length).toBe(0);
    });

    it('debería retornar los productos almacenados', () => {
      // Arrange
      const productosTest = [
        { id: 1, nombre: 'FR001 - Manzanas', precio: 1000, stock: 50 },
        { id: 2, nombre: 'VR001 - Zanahorias', precio: 800, stock: 30 }
      ];
      localStorage.setItem('productos', JSON.stringify(productosTest));

      // Act
      const productos = getProductosFromStorage();

      // Assert
      expect(productos.length).toBe(2);
      expect(productos[0].nombre).toBe('FR001 - Manzanas');
      expect(productos[1].precio).toBe(800);
    });
  });

  describe('saveProductoToStorage', () => {
    it('debería generar código automático según categoría', () => {
      // Arrange
      const nuevoProducto = {
        nombre: 'Naranjas',
        categoria: 'Frutas',
        precio: 1200,
        stock: 40
      };

      // Act
      const resultado = saveProductoToStorage(nuevoProducto);
      const productos = getProductosFromStorage();

      // Assert
      expect(resultado.success).toBe(true);
      expect(productos[0].nombre).toContain('FR'); // Prefijo de Frutas
      expect(productos[0].precio).toBe(1200);
    });

    it('debería validar que el precio sea mayor a 0', () => {
      // Arrange
      const productoInvalido = {
        nombre: 'Producto',
        categoria: 'Frutas',
        precio: 0,
        stock: 10
      };

      // Act
      const resultado = saveProductoToStorage(productoInvalido);

      // Assert
      expect(resultado.success).toBe(false);
      expect(resultado.error).toContain('precio');
    });

    it('debería validar que el stock no sea negativo', () => {
      // Arrange
      const productoInvalido = {
        nombre: 'Producto',
        categoria: 'Frutas',
        precio: 1000,
        stock: -5
      };

      // Act
      const resultado = saveProductoToStorage(productoInvalido);

      // Assert
      expect(resultado.success).toBe(false);
      expect(resultado.error).toContain('stock');
    });
  });

  describe('updateProductoInStorage', () => {
    it('debería actualizar precio y stock de un producto', () => {
      // Arrange
      const productoInicial = {
        id: 1,
        nombre: 'FR001 - Manzanas',
        precio: 1000,
        stock: 50
      };
      localStorage.setItem('productos', JSON.stringify([productoInicial]));

      // Act
      const resultado = updateProductoInStorage(1, { precio: 1500, stock: 60 });
      const productos = getProductosFromStorage();

      // Assert
      expect(resultado.success).toBe(true);
      expect(productos[0].precio).toBe(1500);
      expect(productos[0].stock).toBe(60);
    });
  });

  describe('deleteProductoFromStorage', () => {
    it('debería eliminar un producto correctamente', () => {
      // Arrange
      const productos = [
        { id: 1, nombre: 'Producto1', precio: 1000 },
        { id: 2, nombre: 'Producto2', precio: 2000 }
      ];
      localStorage.setItem('productos', JSON.stringify(productos));

      // Act
      const resultado = deleteProductoFromStorage(1);
      const productosRestantes = getProductosFromStorage();

      // Assert
      expect(resultado.success).toBe(true);
      expect(productosRestantes.length).toBe(1);
      expect(productosRestantes[0].id).toBe(2);
    });
  });
});

// Funciones simplificadas para pruebas
const PREFIJOS_CATEGORIA = {
  'Frutas': 'FR',
  'Verduras': 'VR',
  'Productos Orgánicos': 'PO'
};

function getProductosFromStorage() {
  return JSON.parse(localStorage.getItem('productos') || '[]');
}

function saveProductoToStorage(producto) {
  try {
    if (producto.precio <= 0) {
      return { success: false, error: 'El precio debe ser mayor a 0' };
    }
    if (producto.stock < 0) {
      return { success: false, error: 'El stock no puede ser negativo' };
    }

    const productos = getProductosFromStorage();
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const prefijo = PREFIJOS_CATEGORIA[producto.categoria] || 'XX';
    const codigo = `${prefijo}${String(nuevoId).padStart(3, '0')}`;
    const nombreCompleto = `${codigo} - ${producto.nombre}`;
    
    const nuevoProducto = {
      ...producto,
      id: nuevoId,
      nombre: nombreCompleto
    };
    
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    return { success: true, producto: nuevoProducto };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function updateProductoInStorage(id, datosActualizados) {
  try {
    const productos = getProductosFromStorage();
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) {
      return { success: false, error: 'Producto no encontrado' };
    }
    productos[index] = { ...productos[index], ...datosActualizados };
    localStorage.setItem('productos', JSON.stringify(productos));
    return { success: true, producto: productos[index] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function deleteProductoFromStorage(id) {
  try {
    const productos = getProductosFromStorage();
    const productosFiltrados = productos.filter(p => p.id !== id);
    localStorage.setItem('productos', JSON.stringify(productosFiltrados));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
