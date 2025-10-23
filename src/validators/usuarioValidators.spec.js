// Pruebas unitarias para validaciones de usuarios
describe('Usuario Validators', () => {
  
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });

  describe('validarEmailUnico', () => {
    it('debería retornar true cuando el email no existe en el sistema', () => {
      // Arrange
      const usuariosTest = [
        { id: 1, email: 'existente@test.com' },
        { id: 2, email: 'otro@test.com' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosTest));

      // Act
      const resultado = validarEmailUnico('nuevo@test.com');

      // Assert
      expect(resultado).toBe(true);
    });

    it('debería retornar false cuando el email ya existe', () => {
      // Arrange
      const usuariosTest = [
        { id: 1, email: 'existente@test.com' },
        { id: 2, email: 'otro@test.com' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosTest));

      // Act
      const resultado = validarEmailUnico('existente@test.com');

      // Assert
      expect(resultado).toBe(false);
    });

    it('debería retornar true cuando se valida el mismo email del usuario actual (edición)', () => {
      // Arrange
      const usuariosTest = [
        { id: 1, email: 'usuario@test.com' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosTest));

      // Act
      const resultado = validarEmailUnico('usuario@test.com', 'usuario@test.com');

      // Assert
      expect(resultado).toBe(true);
    });
  });

  describe('validarFormatoEmail', () => {
    it('debería retornar true para emails válidos', () => {
      expect(validarFormatoEmail('usuario@dominio.com')).toBe(true);
      expect(validarFormatoEmail('test123@example.cl')).toBe(true);
      expect(validarFormatoEmail('nombre.apellido@empresa.com')).toBe(true);
    });

    it('debería retornar false para emails inválidos', () => {
      expect(validarFormatoEmail('invalido')).toBe(false);
      expect(validarFormatoEmail('sin@dominio')).toBe(false);
      expect(validarFormatoEmail('@sinusuario.com')).toBe(false);
      expect(validarFormatoEmail('usuario@.com')).toBe(false);
    });
  });

  describe('validarRunUnico', () => {
    it('debería retornar true cuando el RUN no existe', () => {
      // Arrange
      const usuariosTest = [
        { id: 1, run: '12345678-9' },
        { id: 2, run: '98765432-1' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosTest));

      // Act
      const resultado = validarRunUnico('11111111-1');

      // Assert
      expect(resultado).toBe(true);
    });

    it('debería retornar false cuando el RUN ya existe', () => {
      // Arrange
      const usuariosTest = [
        { id: 1, run: '12345678-9' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuariosTest));

      // Act
      const resultado = validarRunUnico('12345678-9');

      // Assert
      expect(resultado).toBe(false);
    });
  });
});

// Importar funciones a probar
function validarEmailUnico(email, emailOriginal = null) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (emailOriginal && email === emailOriginal) {
    return true;
  }
  return !usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
}

function validarFormatoEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarRunUnico(run, runOriginal = null) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (runOriginal && run === runOriginal) {
    return true;
  }
  return !usuarios.some(u => u.run === run);
}
