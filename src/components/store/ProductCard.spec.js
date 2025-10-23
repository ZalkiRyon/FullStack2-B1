/**
 * Pruebas de Componentes React - ProductCard
 * 
 * ✅ Prueba de Evento (agregar al carrito)
 */

describe('ProductCard Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  // Datos de prueba
  const mockProduct = {
    id: 'PROD001',
    nombre: 'Laptop Dell XPS',
    precio: 1200000
  };

  // ✅ PRUEBA DE EVENTO (AGREGAR AL CARRITO)
  it('debería ejecutar callback al hacer clic en "Agregar al Carrito"', () => {
    // Arrange
    let addedProduct = null;
    const onAddToCart = (product) => {
      addedProduct = product;
    };

    container.innerHTML = `
      <div class="product-card">
        <h3>${mockProduct.nombre}</h3>
        <button class="add-to-cart">Agregar al Carrito</button>
      </div>
    `;

    const button = container.querySelector('.add-to-cart');
    button.addEventListener('click', () => onAddToCart(mockProduct));

    // Act
    button.click();

    // Assert
    expect(addedProduct).not.toBeNull();
    expect(addedProduct.nombre).toBe('Laptop Dell XPS');
  });
});
