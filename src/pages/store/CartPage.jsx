import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/store/CartItem";
import Modal from "../../components/common/Modal";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useToast } from "../../context/ToastContext";

function CartPage() {
  const { cartItems, addItem, deleteItem, cleanCart, totalPrice } = useCart();
  const { showToast } = useToast();
  const [confirmModal, setConfirmModal] = useState(false);

  const handleCleanCart = () => {
    if (cartItems.length > 0) {
      cleanCart();
      setConfirmModal(false);
      showToast("Carrito de compras vaciado correctamente", "success", 5000);
    } else {
      showToast("Carrito actualmente vacio", "info", 5000);
    }
  };

  return (
    <div className="mainPage d-flex">
      <section className="izqCarrito">
        <h1>Mi carrito de compras</h1>
        <div className="cartList">
          {cartItems.length > 0 ? (
            cartItems.map((produc) => (
              <CartItem
                key={produc.id}
                id={produc.id}
                name={produc.nombre}
                price={produc.precio}
                quantity={produc.cantidad}
                description={produc.descripcion}
                image={produc.imagen}
                onDecrement={() => deleteItem(produc, 1)}
                onIncrement={() => addItem(produc, 1)}
              />
            ))
          ) : (
            <div class="mensajeErrorCarrito">
              <h2>
                No hay elementos en tu carrito {".·´¯`(>▂<)´¯`·."} <br /> Agrega
                algunos productos para continuar...
              </h2>
            </div>
          )}
        </div>
      </section>
      <section className="derCarrito">
        <div className="resumenCarrito">
          <h3>Total</h3>
        </div>
        <div className="d-flex justify-content-between align-items-center resumenCarrito">
          <span>Total: {totalPrice}</span>
          <span id="totalCarrito"></span>
        </div>
        <div className="d-flex flex-column">
          <div className="w-100 d-flex justify-content-between align-items-baseline">
            <input
              id="cupon"
              type="text"
              placeholder="Ingrese cupon de descuento"
              className="cuponDescuento"
            />
            <PrimaryButton text="Aplicar" width="fit-content" />
          </div>
        </div>

        <div className="containerFooterBtnResumeCart">
          <button
            type="button"
            className="vaciarCarritoBtn"
            onClick={() => setConfirmModal(true)}
          >
            VACIAR CARRITO
          </button>

          <PrimaryButton text="Comprar" width="fit-content" />
        </div>
      </section>

      <Modal
        isOpen={confirmModal}
        title="Vaciar carrito"
        message="Estas seguro que deseas vaciar el carrito de compras compeltamente?"
        confirmText="Confirmar"
        onClose={() => setConfirmModal(false)}
        onConfirm={() => handleCleanCart()}
      />
    </div>
  );
}

export default CartPage;
