import { useEffect, useState } from "react";
import { getOrdenesFromStorage } from "../../utils/dataOrdenes";
import { useAuth } from "../../context/AuthContext";
import PrimaryButton from "../../components/common/PrimaryButton";
import { productImages } from "../../utils/productUtils";
import { useToast } from "../../context/ToastContext";
import Breadcrumbs from "../../components/common/BreadCrumbs";
import BackButton from "../../components/common/BackButton";

const OrdenSummaryPage = () => {
  const [orden, setOrden] = useState(null);
  const { usuario } = useAuth();
  const { showToast } = useToast();
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

  const isSuccess = orden.estado !== "Cancelado";
  const title = isSuccess
    ? `Se ha realizado la compra. nro #${orden.id}`
    : `No se pudo realizar el pago. nro #${orden.id}`;
  const colorClass = isSuccess ? "textSuccess" : "textDanger";

  return (
    <div className="mainPage">
      <Breadcrumbs />
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h1 className={`mb-4 ${colorClass}`}>{title}</h1>
        <h4>Código orden #{orden.numeroOrden}</h4>
      </div>

      <div className="card p-4 mb-4">
        <h4>Detalles de compra</h4>
        <div className="formRow">
          <div className="formField">
            <p>
              <strong>Código orden:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="numberOrder"
              name="numberOrder"
              value={orden.numeroOrden}
              disabled
            />
          </div>
          <div className="formField">
            <p>
              <strong>Nombre:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="name"
              name="name"
              value={usuario.nombre}
              disabled
            />
          </div>
          <div className="formField">
            <p>
              <strong>Apellidos:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="lastname"
              name="lastname"
              value={usuario.apellido}
              disabled
            />
          </div>
        </div>
        <div className="formRow" style={{ width: "35%" }}>
          <div className="formField">
            <p>
              <strong>Correo:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="email"
              name="email"
              value={usuario.email}
              disabled
            />
          </div>
        </div>

        <h4 className="mt-4">Dirección de entrega de los productos</h4>
        <div className="formRow">
          <div className="formField">
            <p>
              <strong>Calle:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="direction"
              name="direction"
              value={usuario.direccion}
              disabled
            />
          </div>
          <div className="formField">
            <p>
              <strong>Departamento (opcional):</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="department"
              name="department"
              value={orden.departamento || "N/A"}
              disabled
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formField">
            <p>
              <strong>Región:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="region"
              name="region"
              value={usuario.region}
              disabled
            />
          </div>
          <div className="formField">
            <p>
              <strong>Comuna:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="comuna"
              name="comuna"
              value={usuario.comuna}
              disabled
            />
          </div>
        </div>
        <div className="formField">
          <p>
            <strong>Indicaciones para la entrega:</strong>
          </p>
          <input
            type="text"
            className="formInputDelivery"
            id="comuna"
            name="comuna"
            value={orden.comentario || "N/A"}
            disabled
          />
        </div>
      </div>

      <table className="table table-striped productTable">
        <thead>
          <tr>
            <th className="px-3" style={{ width: "8%" }}>
              Imagen
            </th>
            <th>Nombre</th>
            <th style={{ textAlign: "right" }}>Precio</th>
            <th style={{ textAlign: "right" }}>Cantidad</th>
            <th style={{ textAlign: "right", paddingRight: "1rem" }}>
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {orden.detalles.map((item) => {
            const imagenSrc =
              productImages[item.imagen] || productImages["default"];

            return (
              <tr key={item.id}>
                <td className="px-3">
                  <img
                    src={imagenSrc}
                    alt={`Imagen del producto ${item.nombre}`}
                  />
                </td>
                <td>{item.nombre || item.name}</td>
                <td style={{ textAlign: "right" }}>
                  ${(item.precio || item.price).toLocaleString("es-CL")}
                </td>
                <td style={{ textAlign: "right" }}>{item.cantidad}</td>
                <td style={{ textAlign: "right", paddingRight: "1rem" }}>
                  ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end align-items-center mt-3">
        <h3 className="me-4">Total pagado:</h3>
        <h3 className="fw-bold">${orden.monto.toLocaleString("es-CL")}</h3>
      </div>

      <div className="d-flex justify-content-between align-items-baseline">
        <BackButton width="fit-content" />
        <div className="d-flex justify-content-end mt-5 gap-5">
          <PrimaryButton
            text="Imprimir boleta en PDF"
            className="me-3"
            onClick={() => {
              showToast("Simulando impresión...", "info", 10000);
            }}
            width="fit-content"
          />
          <PrimaryButton
            text="Enviar boleta por email"
            onClick={() =>
              showToast("Simulando envío de email...", "info", 10000)
            }
            width="fit-content"
          />
        </div>
      </div>
    </div>
  );
};

export default OrdenSummaryPage;
