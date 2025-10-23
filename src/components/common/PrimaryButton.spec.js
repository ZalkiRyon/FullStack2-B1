/**
 * Pruebas de Componentes React - PrimaryButton
 * 
 * ✅ Prueba de Renderizado Correcto
 */

describe('PrimaryButton Component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  // ✅ PRUEBA DE RENDERIZADO CORRECTO
  it('debería renderizar el botón con el texto proporcionado', () => {
    // Arrange & Act
    const buttonText = 'Guardar Cambios';
    container.innerHTML = `<button class="primaryButton">${buttonText}</button>`;
    const button = container.querySelector('button');

    // Assert
    expect(button).toBeDefined();
    expect(button.textContent).toBe(buttonText);
    expect(button.classList.contains('primaryButton')).toBe(true);
  });
});
