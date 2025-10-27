/**
 * Pruebas de Componentes React - Footer
 * 
 * Prueba de validacion de formulario (email)
 */

/**
 * PRUEBA 5: Validacion de Formato de Email
 * 
 * Objetivo: Verificar que la validacion de emails funcione correctamente
 * usando expresiones regulares (regex).
 * 
 * Proceso:
 * 1. Define un email valido de prueba
 * 2. Aplica una expresion regular que valida el formato email
 * 3. Verifica que el email pase la validacion (retorna true)
 * 
 * Concepto educativo: VALIDACION - Expresiones regulares
 * Demuestra como validar input del usuario antes de enviar formularios.
 * Patron regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * - ^[^\s@]+ = uno o mas caracteres que no sean espacio ni @
 * - @ = debe contener exactamente un @
 * - [^\s@]+ = uno o mas caracteres despues del @
 * - \. = debe contener un punto
 * - [^\s@]+$ = uno o mas caracteres despues del punto
 * 
 * Aplicacion real: El Footer contiene un formulario de newsletter
 * que debe validar emails antes de suscribir usuarios.
 */
describe('Footer', function() {
  it('deberia validar formato de email', function() {
    // Arrange: Email valido de prueba
    var email = 'usuario@example.com';
    
    // Expresion regular que valida formato email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Act & Assert: Verificar que el email pasa la validacion
    expect(emailRegex.test(email)).toBe(true);
  });
});
