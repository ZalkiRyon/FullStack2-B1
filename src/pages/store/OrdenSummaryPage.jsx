import React, { useEffect, useState } from "react";
import { getOrdenesFromStorage } from "../../utils/dataOrdenes";
import { useAuth } from "../../context/AuthContext";
import PrimaryButton from "../../components/common/PrimaryButton";

const OrdenSummaryPage = () => {
  const [orden, setOrden] = useState(null);
  const { usuario } = useAuth();
  const orderNumber = localStorage.getItem("UltimaOrdenId");

  useEffect(() => {
    const cargarOrden = () => {
      const order = getOrdenesFromStorage();
      const orderParse = parseInt(orderNumber);
      const orderFinded = order.find((o) => o.id === orderParse);

      if (orderFinded) {
        setOrden(orderFinded);
      }
    };

    cargarOrden();
  }, [orderNumber]);

  if (!orden) {
    return (
      <div className="mainPage p-5">Orden no encontrada o error de carga.</div>
    );
  }

  const esExitosa = orden.estado !== "Cancelado";
  const titulo = esExitosa
    ? `Se ha realizado la compra. nro #${orden.numeroOrden.slice(2)}`
    : `No se pudo realizar el pago. nro #${orden.numeroOrden.slice(2)}`;
  const colorClase = esExitosa ? "textSuccess" : "textDanger";

  return (
    <div className="mainPage">
      <h1 className={`mb-4 ${colorClase}`}>{titulo}</h1>
      {/* -------------------- INFORMACIÓN DEL CLIENTE Y ENVÍO -------------------- */}
      <div className="card p-4 mb-4">
        <p>
          <strong>Código orden:</strong> {orden.numeroOrden}
        </p>
        <div className="row mb-3">
          <div className="col">
            <strong>Nombre:</strong> {usuario.nombre}
          </div>
          <div className="col">
            <strong>Apellidos:</strong> {usuario.apellido}
          </div>
          <div className="col">
            <strong>Correo:</strong> {usuario.email}
          </div>
        </div>

        <h4>Dirección de entrega de los productos</h4>
        <div className="row">
          <div className="col-8">
            <strong>Calle:</strong> {usuario.direccion}
          </div>
          <div className="col-4">
            <strong>Departamento (opcional):</strong>{" "}
            {orden.departamento || "N/A"}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <strong>Región:</strong> {usuario.region}
          </div>
          <div className="col">
            <strong>Comuna:</strong> {usuario.comuna}
          </div>
        </div>
        <p className="mt-2">
          <strong>Indicaciones para la entrega:</strong>
          {orden.comentario || "N/A"}
        </p>
      </div>

      {/* -------------------- RESUMEN DE PRODUCTOS (Detalles) -------------------- */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orden.detalles.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre || item.name}</td>
              <td>${(item.precio || item.price).toLocaleString("es-CL")}</td>
              <td>{item.cantidad}</td>
              <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-end align-items-center mt-3">
        <h3 className="me-4">Total pagado:</h3>
        <h3 className="fw-bold">${orden.monto.toLocaleString("es-CL")}</h3>
      </div>

      {/* -------------------- BOTONES -------------------- */}
      <div className="d-flex justify-content-center mt-4">
        <PrimaryButton
          text="Imprimir boleta en PDF"
          className="me-3"
          variant="secondary"
          onClick={() => alert("Simulando impresión...")}
        />
        <PrimaryButton
          text="Enviar boleta por email"
          variant="success"
          onClick={() => alert("Simulando envío de email...")}
        />
      </div>
    </div>
  );
};

export default OrdenSummaryPage;
