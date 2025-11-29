import { useEffect, useState } from "react";
import OrdenSummary from "../../components/store/OrdenSummary";
import DeliveryForm from "../../components/store/DeliveryForm";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/OrderService";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import axios from "axios";

const CheckoutPage = () => {
  const { usuario } = useAuth();
  const { showToast } = useToast();
  const { cartItems, totalPrice, cleanCart } = useCart();
  const navigate = useNavigate();
  const [shippingCost, setShippingCost] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(true);

  const [formData, setFormData] = useState({
    name: usuario?.nombre || "",
    lastname: usuario?.apellido || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || "",
    direction: usuario?.direccion || "",
    department: "",
    region: usuario?.region || "",
    comuna: usuario?.comuna || "",
    comment: "",
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
    }
  }, [usuario, formData.name]);

  // Calcular costo de envío al cargar la página
  useEffect(() => {
    const fetchShippingCost = async () => {
      try {
        setLoadingShipping(true);
        const response = await axios.get(
          "http://localhost:8080/api/ordenes/calcular-envio",
          {
            params: {
              region: usuario?.region || "",
              comuna: usuario?.comuna || "",
            },
          }
        );
        setShippingCost(response.data.costoEnvio);
      } catch (error) {
        console.error("Error al calcular costo de envío:", error);
        // Fallback: generar costo aleatorio en el frontend si el backend falla
        const costoAleatorio = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
        setShippingCost(costoAleatorio);
      } finally {
        setLoadingShipping(false);
      }
    };

    fetchShippingCost();
  }, [usuario]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapear cartItems al formato que espera el backend (solo productoId y cantidad)
    const detalles = cartItems.map((item) => ({
      productoId: item.id,
      cantidad: item.cantidad,
    }));

    const nuevaOrden = {
      clienteId: usuario?.id || null,
      comentario: formData.comment || "",
      detalles: detalles,
    };

    try {
      const ordenCreada = await createOrder(nuevaOrden);
      
      if (ordenCreada) {
        // Guardar la orden completa (con costoEnvio del backend) en localStorage
        localStorage.setItem("UltimaOrdenCreada", JSON.stringify(ordenCreada));
        localStorage.setItem("UltimaOrdenId", ordenCreada.id);
        showToast("¡Orden creada exitosamente!", "success", 3000);
        navigate("/resumen-compra");
        cleanCart();
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      showToast("Error al guardar la orden. Intente nuevamente.", "error", 10000);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mainPage p-5">
        <h1>Error al mostrar el carrito... Intente mas tarde.</h1>
      </div>
    );
  }

  // Calcular el total final con el costo de envío
  const finalTotal = shippingCost !== null ? totalPrice + shippingCost : null;

  // Verificar si el usuario es Admin o Vendedor
  const isAdminOrVendedor = usuario?.roleNombre === "admin" || usuario?.roleNombre === "vendedor";
  
  // Determinar el texto del botón
  const getButtonText = () => {
    if (isAdminOrVendedor) {
      return usuario.roleNombre === "admin" 
        ? "Pago Deshabilitado para Administrador" 
        : "Pago Deshabilitado para Vendedor";
    }
    return "Confirmar y pagar";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mainPage d-flex flex-row justify-content-between"
    >
      <div className="checkoutSummaryWrapper">
        <h2>Tu pedido</h2>
        <OrdenSummary
          shippingCost={loadingShipping ? "Calculando..." : shippingCost}
          finalTotal={loadingShipping ? "Calculando..." : finalTotal}
        />
        <PrimaryButton 
          text={getButtonText()} 
          type="submit"
          disabled={loadingShipping || isAdminOrVendedor}
        />
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
