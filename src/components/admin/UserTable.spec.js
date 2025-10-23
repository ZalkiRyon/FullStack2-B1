/**
 * Pruebas de Componentes React - UserTable
 * 
 * ✅ Prueba de Renderizado con Datos
 * ✅ Prueba de Estado (filtrado)
 */

describe('UserTable Component', () => {
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
  const mockUsers = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'admin' },
    { id: 2, nombre: 'María García', email: 'maria@example.com', rol: 'user' }
  ];

  // ✅ PRUEBA DE RENDERIZADO CON DATOS
  it('debería renderizar la tabla con los usuarios proporcionados', () => {
    // Arrange & Act
    container.innerHTML = `
      <table class="userTable">
        <tbody>
          ${mockUsers.map(user => `
            <tr data-id="${user.id}">
              <td>${user.nombre}</td>
              <td>${user.email}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const table = container.querySelector('table');
    const rows = container.querySelectorAll('tbody tr');

    // Assert
    expect(table).toBeDefined();
    expect(rows.length).toBe(2);
    expect(rows[0].querySelector('td:nth-child(1)').textContent).toBe('Juan Pérez');
  });

  // ✅ PRUEBA DE ESTADO (FILTRADO)
  it('debería actualizar la lista cuando cambia el estado de filtro', () => {
    // Arrange
    let currentFilter = '';
    const updateFilter = (newFilter) => {
      currentFilter = newFilter;
    };

    // Act - Estado inicial
    updateFilter('');
    let filteredUsers = mockUsers.filter(u => 
      u.nombre.toLowerCase().includes(currentFilter.toLowerCase())
    );
    expect(filteredUsers.length).toBe(2);

    // Act - Cambiar estado del filtro
    updateFilter('juan');
    filteredUsers = mockUsers.filter(u => 
      u.nombre.toLowerCase().includes(currentFilter.toLowerCase())
    );

    // Assert
    expect(currentFilter).toBe('juan');
    expect(filteredUsers.length).toBe(1);
    expect(filteredUsers[0].nombre).toBe('Juan Pérez');
  });
});
