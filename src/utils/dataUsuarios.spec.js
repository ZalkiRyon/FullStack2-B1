// Pruebas unitarias para CRUD de usuarios
describe('Data Usuarios - CRUD Operations', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getUsuariosFromStorage', () => {
    it('debería retornar un array vacío cuando no hay usuarios', () => {
      // Act
      const usuarios = getUsuariosFromStorage();

      // Assert
      expect(Array.isArray(usuarios)).toBe(true);
      expect(usuarios.length).toBe(0);
    });

    it('debería retornar los usuarios almacenados en localStorage', () => {
      // Arrange
      const usuariosTest = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@test.com' },
        { id: 2, nombre: 'María', apellido: 'González', email: 'maria@test.com' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosTest));

      // Act
      const usuarios = getUsuariosFromStorage();

      // Assert
      expect(usuarios.length).toBe(2);
      expect(usuarios[0].nombre).toBe('Juan');
      expect(usuarios[1].email).toBe('maria@test.com');
    });
  });

  describe('saveUsuarioToStorage', () => {
    it('debería guardar un nuevo usuario con ID autoincrementado', () => {
      // Arrange
      const nuevoUsuario = {
        nombre: 'Carlos',
        apellido: 'Ramírez',
        email: 'carlos@test.com',
        role: 'cliente'
      };

      // Act
      const resultado = saveUsuarioToStorage(nuevoUsuario);
      const usuarios = getUsuariosFromStorage();

      // Assert
      expect(resultado.success).toBe(true);
      expect(usuarios.length).toBe(1);
      expect(usuarios[0].id).toBeDefined();
      expect(usuarios[0].nombre).toBe('Carlos');
    });

    it('debería asignar IDs secuenciales a múltiples usuarios', () => {
      // Arrange
      const usuario1 = { nombre: 'Usuario1', email: 'user1@test.com', role: 'cliente' };
      const usuario2 = { nombre: 'Usuario2', email: 'user2@test.com', role: 'cliente' };

      // Act
      saveUsuarioToStorage(usuario1);
      saveUsuarioToStorage(usuario2);
      const usuarios = getUsuariosFromStorage();

      // Assert
      expect(usuarios.length).toBe(2);
      expect(usuarios[0].id).toBe(1);
      expect(usuarios[1].id).toBe(2);
    });
  });

  describe('updateUsuarioInStorage', () => {
    it('debería actualizar un usuario existente', () => {
      // Arrange
      const usuarioInicial = {
        id: 1,
        nombre: 'Original',
        email: 'original@test.com',
        role: 'cliente'
      };
      localStorage.setItem('usuarios', JSON.stringify([usuarioInicial]));

      const datosActualizados = {
        nombre: 'Actualizado',
        email: 'actualizado@test.com'
      };

      // Act
      const resultado = updateUsuarioInStorage(1, datosActualizados);
      const usuarios = getUsuariosFromStorage();

      // Assert
      expect(resultado.success).toBe(true);
      expect(usuarios[0].nombre).toBe('Actualizado');
      expect(usuarios[0].email).toBe('actualizado@test.com');
    });

    it('debería retornar error si el usuario no existe', () => {
      // Act
      const resultado = updateUsuarioInStorage(999, { nombre: 'Test' });

      // Assert
      expect(resultado.success).toBe(false);
      expect(resultado.error).toContain('no encontrado');
    });
  });

  describe('deleteUsuarioFromStorage', () => {
    it('debería eliminar un usuario por ID', () => {
      // Arrange
      const usuarios = [
        { id: 1, nombre: 'Usuario1', email: 'user1@test.com' },
        { id: 2, nombre: 'Usuario2', email: 'user2@test.com' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Act
      const resultado = deleteUsuarioFromStorage(1);
      const usuariosRestantes = getUsuariosFromStorage();

      // Assert
      expect(resultado.success).toBe(true);
      expect(usuariosRestantes.length).toBe(1);
      expect(usuariosRestantes[0].id).toBe(2);
    });
  });
});

// Funciones simplificadas para las pruebas
function getUsuariosFromStorage() {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

function saveUsuarioToStorage(usuario) {
  try {
    const usuarios = getUsuariosFromStorage();
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const nuevoUsuario = { ...usuario, id: nuevoId, fechaRegistro: new Date().toISOString() };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return { success: true, usuario: nuevoUsuario };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function updateUsuarioInStorage(id, datosActualizados) {
  try {
    const usuarios = getUsuariosFromStorage();
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    usuarios[index] = { ...usuarios[index], ...datosActualizados };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return { success: true, usuario: usuarios[index] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function deleteUsuarioFromStorage(id) {
  try {
    const usuarios = getUsuariosFromStorage();
    const usuariosFiltrados = usuarios.filter(u => u.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuariosFiltrados));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
