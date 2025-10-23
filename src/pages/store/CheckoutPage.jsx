import React, { useEffect, useState } from "react";
import OrdenSummary from "../../components/store/OrdenSummary";
import DeliveryForm from "../../components/store/DeliveryForm";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import {
  getOrdenesFromStorage,
  saveOrdenToStorage,
} from "../../utils/dataOrdenes";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateRandomStatus() {
  const estados = ["Enviado", "Pendiente", "Procesando", "Cancelado"];

  const indiceAleatorio = Math.floor(Math.random() * estados.length);

  return estados[indiceAleatorio];
}

const CheckoutPage = () => {
  const { usuario } = useAuth();
  const { showToast } = useToast();
  const { cartItems, totalPrice, cleanCart } = useCart();
  const navigate = useNavigate();
  const [shippingCost, setShippingCost] = useState(0);

  const ultimoElemento = getOrdenesFromStorage().length;

  const [formData, setFormData] = useState({
    name: usuario?.nombre || "",
    lastname: usuario?.apellido || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || "",
    direction: usuario?.direccion || "aaa",
    department: "",
    region: usuario?.region || "",
    comuna: usuario?.comuna || "",
    comment: "",
  });

  const [orderData, setOrderData] = useState({
    id: ultimoElemento ? ultimoElemento + 1 : 1,
    numeroOrden: "SO" + generateRandomNumber(1000, 9000),
    fecha: new Date().toISOString().split("T")[0],
    clienteId: usuario?.id || null,
    estado: generateRandomStatus(),
  });

  useEffect(() => {
    if (usuario && !formData.name) {
      setFormData((prevData) => ({
        ...prevData,
        name: usuario.nombre || prevData.name,
        lastname: usuario.apellido || prevData.lastname,
        email: usuario.email || prevData.email,
        calle: usuario.direccion || prevData.calle,
        region: usuario.region || prevData.region,
        comuna: usuario.comuna || prevData.comuna,
        telefono: usuario.telefono || prevData.telefono,
      }));

      setOrderData((prevMeta) => ({
        clienteId: usuario.id || prevMeta.clienteId,
      }));
    }

    if (shippingCost == 0) {
      const randomCost = generateRandomNumber(3000, 7000);
      setShippingCost(randomCost);
    }
  }, [usuario, shippingCost]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalConEnvio = totalPrice + shippingCost;

    const nuevaOrden = {
      ...orderData,
      clienteNombre: formData.name + " " + formData.lastname,
      monto: totalConEnvio,
      departamento: formData.department,
      comentario: formData.comment,
      detalles: [...cartItems],
    };

    saveOrdenToStorage(nuevaOrden);

    if (saveOrdenToStorage(nuevaOrden).success) {
      localStorage.setItem("UltimaOrdenId", nuevaOrden.id);
      navigate("/resumen-compra");
    } else {
      showToast("Error al guardar la orden", "error", 10000);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mainPage p-5">
        <h1>Error al mostrar el carrito... Intente mas tarde.</h1>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mainPage d-flex flex-row justify-content-between"
    >
      <div className="checkoutSummaryWrapper">
        <h2>Tu pedido</h2>
        <OrdenSummary
          shippingCost={shippingCost}
          finalTotal={totalPrice + shippingCost}
        />
        <PrimaryButton text="Confirmar y pagar" type="submit" />
      </div>

      <div className="checkoutFormWrapper">
        <h2>Informacion del cliente</h2>
        <DeliveryForm
          formData={formData}
          setFormData={setFormData}
          handleFormChange={handleFormChange}
        />
      </div>
    </form>
  );
};

export default CheckoutPage;
