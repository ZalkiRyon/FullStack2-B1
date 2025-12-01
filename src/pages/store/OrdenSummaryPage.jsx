import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PrimaryButton from "../../components/common/PrimaryButton";
import { productImages } from "../../utils/productUtils";
import { useToast } from "../../context/ToastContext";
import Breadcrumbs from "../../components/common/BreadCrumbs";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../../services/OrderService";

const OrdenSummaryPage = () => {
  const [orden, setOrden] = useState(null);
  const { usuario } = useAuth();
  const { showToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarOrden = async () => {
      if (!id) {
        showToast("No se encontro ID de la orden", "error", 10000);
        return;
      }
      try {
        const orderDetails = await getOrderById(id);

        if (orderDetails) {
          setOrden(orderDetails);
        } else {
          showToast(`La orden ${id} no fue encontrada.`, "error", 10000);
        }
      } catch (error) {
        showToast(
          "Hubo un error al cargar los detalles de la orden.",
          "error",
          10000
        );
      }
    };

    cargarOrden();
  }, [id]);

  if (!orden) {
    return (
      <div className="mainPage p-5">Orden no encontrada o error de carga.</div>
    );
  }

  // El backend puede devolver estadoNombre o estadoId
  const estadoNombre = orden.estadoNombre || orden.estado || "Pendiente";
  const isSuccess = estadoNombre !== "Cancelado";
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
              value={
                orden.nombreCliente ||
                orden.nombreClienteSnapshot ||
                usuario?.nombre ||
                ""
              }
              disabled
            />
          </div>
          <div className="formField">
            <p>
              <strong>Email:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="email"
              name="email"
              value={
                orden.emailCliente ||
                orden.emailClienteSnapshot ||
                usuario?.email ||
                ""
              }
              disabled
            />
          </div>
        </div>

        <h4 className="mt-4">Dirección de entrega de los productos</h4>
        <div className="formRow">
          <div className="formField">
            <p>
              <strong>Dirección:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="direction"
              name="direction"
              value={orden.direccionEnvio || usuario?.direccion || ""}
              disabled
            />
          </div>
          <div className="formField">
            <p>
              <strong>Teléfono:</strong>
            </p>
            <input
              type="text"
              className="formInputDelivery"
              id="telefono"
              name="telefono"
              value={orden.telefonoContacto || usuario?.telefono || ""}
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
              value={orden.regionEnvio || usuario?.region || ""}
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
              value={orden.comunaEnvio || usuario?.comuna || ""}
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
            id="comentario"
            name="comentario"
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
          {orden.detalles &&
            orden.detalles.map((item, index) => {
              const imagenSrc =
                productImages[item.imagen] || productImages["default"];

              return (
                <tr key={item.id || index}>
                  <td className="px-3">
                    <img
                      src={imagenSrc}
                      alt={`Imagen del producto ${item.nombreProductoSnapshot}`}
                    />
                  </td>
                  <td>{item.nombreProductoSnapshot}</td>
                  <td style={{ textAlign: "right" }}>
                    ${item.precioUnitarioSnapshot.toLocaleString("es-CL")}
                  </td>
                  <td style={{ textAlign: "right" }}>{item.cantidad}</td>
                  <td style={{ textAlign: "right", paddingRight: "1rem" }}>
                    ${item.subtotal.toLocaleString("es-CL")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="d-flex flex-column align-items-end mt-3">
        <div className="d-flex justify-content-end align-items-center mb-2">
          <h5 className="me-4">Subtotal productos:</h5>
          <h5>
            $
            {orden.detalles
              .reduce((sum, item) => sum + item.subtotal, 0)
              .toLocaleString("es-CL")}
          </h5>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-2">
          <h5 className="me-4">Costo de envío:</h5>
          <h5 className="fw-bold text-success">
            ${orden.costoEnvio.toLocaleString("es-CL")}
          </h5>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-2 pt-2 border-top">
          <h3 className="me-4">Total pagado:</h3>
          <h3 className="fw-bold">
            ${orden.montoTotal.toLocaleString("es-CL")}
          </h3>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button
          type="button"
          className="backButton"
          onClick={() => {
            navigate("/");
          }}
        >
          Volver
        </button>
        <PrimaryButton
          text="Enviar detalle por email"
          onClick={() =>
            showToast("Simulando envío de email...", "info", 10000)
          }
          width="fit-content"
        />
      </div>
    </div>
  );
};

export default OrdenSummaryPage;
