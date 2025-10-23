describe('CartItem', function() {
  it('deberia calcular el subtotal correctamente', function() {
    var price = 2000;
    var quantity = 3;
    var subtotal = price * quantity;
    expect(subtotal).toBe(6000);
  });
});
