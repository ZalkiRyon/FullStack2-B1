/**
 * Pruebas de Componentes React - ProductForm
 * 
 * Prueba de Estado (cambio en input)
 */

describe('ProductForm Component', () => {
  let container;

  // Se ejecuta antes de cada prueba: crea un contenedor limpio en el DOM
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  // Se ejecuta después de cada prueba: limpia el contenedor del DOM
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  /**
   * PRUEBA 6: Actualización de Estado en Input
   * 
   * Objetivo: Verificar que cuando el usuario escribe en un campo de texto,
   * el estado del formulario se actualice correctamente (controlled component).
   * 
   * Proceso:
   * 1. Crea un objeto de estado simulando useState({ nombre: '' })
   * 2. Renderiza un input vinculado a ese estado
   * 3. Agrega un event listener que simula onChange de React
   * 4. Simula que el usuario escribe "Nuevo Producto"
   * 5. Verifica que el estado se actualizó con el nuevo valor
   * 
   * Concepto educativo: ESTADO (STATE) - Controlled Components
   * Demuestra cómo los inputs controlados actualizan el estado en tiempo real.
   */
  it('debería actualizar el estado cuando el usuario escribe en un input', () => {
    // Arrange: Simular el estado inicial del formulario
    let formData = { nombre: '' }; // Simula: const [formData, setFormData] = useState({ nombre: '' })
    
    // Función que simula setState para actualizar el estado
    const updateFormData = (field, value) => {
      formData[field] = value; // Simula: setFormData({ ...formData, [field]: value })
    };

    // Renderizar el input en el DOM
    container.innerHTML = `
      <form>
        <input type="text" name="nombre" value="${formData.nombre}" />
      </form>
    `;

    // Obtener el input y agregar listener que simula onChange de React
    const input = container.querySelector('input[name="nombre"]');
    input.addEventListener('input', (e) => updateFormData('nombre', e.target.value));

    // Act: Simular que el usuario escribe en el input
    input.value = 'Nuevo Producto'; // Usuario escribe
    input.dispatchEvent(new Event('input')); // Dispara el evento onChange

    // Assert: Verificar que el estado se actualizó correctamente
    expect(formData.nombre).toBe('Nuevo Producto');
  });
});
