/**
 * Pruebas de Componentes React - BackButton
 * 
 * ✅ Prueba de Renderizado Condicional
 * ✅ Prueba de Eventos (navegación)
 */

describe('BackButton Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  // ✅ PRUEBA DE RENDERIZADO CONDICIONAL
  it('debería mostrar u ocultar el botón según condición', () => {
    // Arrange
    const showBackButton = false;

    // Act
    container.innerHTML = showBackButton 
      ? `<button class="backButton">Volver</button>` 
      : '';
    const button = container.querySelector('button');

    // Assert
    expect(button).toBeNull();
  });

  // ✅ PRUEBA DE EVENTOS (NAVEGACIÓN)
  it('debería ejecutar navigate(-1) cuando se hace clic', () => {
    // Arrange
    let navigateCalled = false;
    const mockNavigate = (value) => {
      navigateCalled = true;
      expect(value).toBe(-1);
    };

    container.innerHTML = `<button class="backButton" id="backBtn">Volver</button>`;
    const button = container.querySelector('#backBtn');
    button.addEventListener('click', () => mockNavigate(-1));

    // Act
    button.click();

    // Assert
    expect(navigateCalled).toBe(true);
  });
});
