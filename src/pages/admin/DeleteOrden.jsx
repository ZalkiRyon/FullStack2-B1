import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import {
  deleteOrderById,
  getOrderById,
} from "../../services/OrderService";

const DeleteOrden = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orden, setOrden] = useState(null);

  // Cargar datos de la orden
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const ordenEncontrada = await getOrderById(parseInt(id));

        if (ordenEncontrada) {
          setOrden(ordenEncontrada);
        } else {
          alert("Orden no encontrada");
          navigate("/admin/ordenes");
        }
      } catch (error) {
        console.error("Error al cargar orden:", error);
        alert("Error al cargar la orden");
        navigate("/admin/ordenes");
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Está seguro que desea eliminar la orden?\n\nNúmero de Orden: ${orden.numeroOrden}\nCliente: ${orden.nombreClienteSnapshot}\nMonto Total: $${orden.montoTotal.toLocaleString()}\n\nEsta acción no se puede deshacer.`
    );

    if (confirmacion) {
      try {
        await deleteOrderById(parseInt(id));
        alert("Orden eliminada exitosamente");
        navigate("/admin/ordenes");
      } catch (error) {
        console.error("Error al eliminar orden:", error);
        alert(`Error al eliminar orden con id ${id}`);
      }
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatMonto = (monto) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(monto);
  };

  if (!orden) {
    return (
      <div className="inventarioContainer">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="inventarioContainer">
      {/* Header con estilo rojo de advertencia */}
      <div className="inventarioHeader" style={{ backgroundColor: "#dc3545" }}>
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle" style={{ color: "white" }}>
            Eliminar Orden
          </h1>
        </div>
      </div>

      {/* Formulario de solo lectura */}
      <div className="inventarioTableSection">
        <div className="formHeader" style={{ backgroundColor: "#dc3545" }}>
          <h2 className="formSectionTitle" style={{ color: "white" }}>
            DATOS DE LA ORDEN A ELIMINAR
          </h2>
        </div>

        <form className="formAdmin">
          {/* Fila 1: Número de Orden y Fecha */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="numeroOrden">
                Número de Orden
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="numeroOrden"
                name="numeroOrden"
                value={orden.numeroOrden}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="fecha">
                Fecha
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="fecha"
                name="fecha"
                value={formatFecha(orden.fecha)}
                disabled
              />
            </div>
          </div>

          {/* Fila 2: Cliente y Estado */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="cliente">
                Cliente
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="cliente"
                name="cliente"
                value={orden.nombreClienteSnapshot}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="estado">
                Estado
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="estado"
                name="estado"
                value={orden.estado}
                disabled
              />
            </div>
          </div>

          {/* Fila 3: Montos */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="subtotal">
                Subtotal
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="subtotal"
                name="subtotal"
                value={formatMonto(orden.subtotal)}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="costoEnvio">
                Costo de Envío
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="costoEnvio"
                name="costoEnvio"
                value={formatMonto(orden.costoEnvio)}
                disabled
              />
            </div>
          </div>

          {/* Monto Total */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="montoTotal">
              Monto Total
            </label>
            <input
              type="text"
              className="formInputAdmin"
              id="montoTotal"
              name="montoTotal"
              value={formatMonto(orden.montoTotal)}
              disabled
              style={{ fontWeight: "bold", fontSize: "1.1rem" }}
            />
          </div>

          {/* Información de Envío */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="direccionEnvio">
              Dirección de Envío
            </label>
            <textarea
              className="formInputAdmin formTextareaAdmin"
              id="direccionEnvio"
              name="direccionEnvio"
              rows="3"
              value={`${orden.direccionEnvio}, ${orden.comunaEnvio}, ${orden.regionEnvio}`}
              disabled
            />
          </div>

          {/* Productos de la Orden */}
          {orden.items && orden.items.length > 0 && (
            <div className="formGroupAdmin">
              <label className="labelFormAdmin">
                Productos ({orden.items.length})
              </label>
              <div className="orderItemsList">
                {orden.items.map((item, index) => (
                  <div key={index} className="orderItemCard">
                    <div>
                      <strong>{item.nombreProducto}</strong>
                    </div>
                    <div>
                      Cantidad: {item.cantidad} | Precio unitario: {formatMonto(item.precioUnitario)}
                    </div>
                    <div>
                      Subtotal: {formatMonto(item.subtotal)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="formActionsGroup">
            <BackButton text="Volver" />
            <button
              type="button"
              className="btnEliminarUsuario"
              onClick={handleEliminar}
            >
              Eliminar Orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteOrden;
