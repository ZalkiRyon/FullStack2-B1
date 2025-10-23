describe('ProductCard', function() {
  it('deberia formatear el precio correctamente', function() {
    var price = 1500;
    var formattedPrice = price.toLocaleString('es-CL');
    expect(formattedPrice).toBe('1.500');
  });
});
