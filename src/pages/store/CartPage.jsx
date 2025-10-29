import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { CartItem } from "../../components/store/CartItem";
import Modal from "../../components/common/Modal";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, addItem, deleteItem, cleanCart, totalPrice } = useCart();
  const { usuario } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmPaymentModal, setConfirmPaymentModal] = useState(false);

  const isLoggedIn = !!usuario;

  const handleCleanCart = () => {
    if (cartItems.length == 0) {
      showToast("Carrito actualmente vacio", "info", 5000);
    } else {
      cleanCart();
      setConfirmModal(false);
      showToast("Carrito de compras vaciado correctamente", "success", 5000);
    }
  };

  const handlePayment = () => {
    if (cartItems.length == 0) {
      showToast(
        "Tu carrito está vacío, agrega productos para pagar.",
        "info",
        4000
      );
      return;
    }
    setConfirmPaymentModal(true);
  };

  const handlePaymentConfirmation = () => {
    setConfirmPaymentModal(false);

    if (isLoggedIn) {
      navigate("/pago");
    } else {
      navigate("/inicio-sesion");
    }
  };

  return (
    <div className="mainPage d-flex">
      <section className="izqCarrito">
        <h1 className="title">Mi carrito de compras</h1>
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
            <div className="mensajeErrorCarrito">
              <h3>
                No hay elementos en tu carrito <br /> Agrega algunos productos
                para continuar...
              </h3>
            </div>
          )}
        </div>
      </section>
      <section className="derCarrito">
        <div className="resumenCarrito">
          <h3>Total</h3>
        </div>
        <div className="d-flex justify-content-between align-items-center resumenCarrito">
          <span>Total: {totalPrice.toLocaleString("es-CL")}</span>
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

          <PrimaryButton
            text="Comprar"
            width="fit-content"
            onClick={() => handlePayment()}
          />
        </div>
      </section>

      {/* Modal para confirmar vaciar carrito */}
      <Modal
        isOpen={confirmModal}
        title="Vaciar carrito"
        message="¿Estás seguro que deseas vaciar el carrito de compras completamente?"
        confirmText="Confirmar"
        onClose={() => setConfirmModal(false)}
        onConfirm={handleCleanCart}
      />

      {/* Modal para confirmar el pago del carrito redirige a Payment */}
      <Modal
        isOpen={confirmPaymentModal}
        title={
          isLoggedIn ? "Confirmacion de compra" : "Inicio de Sesión Requerido"
        }
        message={
          isLoggedIn
            ? "¡Ya casi terminas! Confirma para continuar el proceso de pago y finalizar tu pedido."
            : "Para proceder con la compra y el pago, debes iniciar sesión o registrarte primero."
        }
        onClose={() => setConfirmPaymentModal(false)}
        onConfirm={handlePaymentConfirmation}
        confirmText={isLoggedIn ? "Pagar y continuar" : "Ir a inicio sesion"}
      />
    </div>
  );
}

export default CartPage;
