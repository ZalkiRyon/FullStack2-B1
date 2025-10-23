describe('Footer', function() {
  it('deberia validar formato de email', function() {
    var email = 'usuario@example.com';
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(email)).toBe(true);
  });
});
