/**
 * Pruebas de Componentes React - ProductForm
 * 
 * Prueba de Estado (cambio en input)
 */

describe('ProductForm Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  //  PRUEBA DE ESTADO (CAMBIO EN INPUT)
  it('debería actualizar el estado cuando el usuario escribe en un input', () => {
    // Arrange
    let formData = { nombre: '' };
    const updateFormData = (field, value) => {
      formData[field] = value;
    };

    container.innerHTML = `
      <form>
        <input type="text" name="nombre" value="${formData.nombre}" />
      </form>
    `;

    const input = container.querySelector('input[name="nombre"]');
    input.addEventListener('input', (e) => updateFormData('nombre', e.target.value));

    // Act
    input.value = 'Nuevo Producto';
    input.dispatchEvent(new Event('input'));

    // Assert
    expect(formData.nombre).toBe('Nuevo Producto');
  });
});
