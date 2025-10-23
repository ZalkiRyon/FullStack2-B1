describe('BreadCrumbs', function() {
  it('deberia formatear texto correctamente', function() {
    var value = 'productos';
    var formatted = value.charAt(0).toUpperCase() + value.slice(1);
    expect(formatted).toBe('Productos');
  });
});
