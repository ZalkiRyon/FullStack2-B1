import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { getOrderById } from "../../services/OrderService";

const ShowOrden = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos de la orden desde el backend
  useEffect(() => {
    const cargarOrden = async () => {
      try {
        setLoading(true);
        const ordenData = await getOrderById(parseInt(id));

        if (ordenData) {
          // Mapear datos del backend
          const ordenMapeada = {
            id: ordenData.id,
            numeroOrden: ordenData.numeroOrden,
            fecha: ordenData.fecha,
            clienteNombre: ordenData.nombreClienteSnapshot,
            estado: ordenData.estado,
            monto: ordenData.montoTotal,
            costoEnvio: ordenData.costoEnvio,
            detalles: ordenData.detalles.map(detalle => ({
              productoNombre: detalle.nombreProductoSnapshot,
              cantidad: detalle.cantidad,
              precioUnitario: detalle.precioUnitarioSnapshot,
              subtotal: detalle.subtotal
            }))
          };
          setOrden(ordenMapeada);
        } else {
          alert("Orden no encontrada");
          navigate("/vendedor/ordenes");
        }
      } catch (error) {
        console.error("Error al cargar la orden:", error);
        alert("Error al cargar la orden");
        navigate("/vendedor/ordenes");
      } finally {
        setLoading(false);
      }
    };

    cargarOrden();
  }, [id, navigate]);

  // Función para formatear el precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(precio);
  };

  // Función para obtener clase del badge de estado
  const getEstadoClass = (estado) => {
    switch (estado) {
      case "Enviado":
        return "estadoEnviado";
      case "Procesando":
        return "estadoProcesando";
      case "Pendiente":
        return "estadoPendiente";
      case "Cancelado":
        return "estadoCancelado";
      default:
        return "";
    }
  };

  if (loading || !orden) {
    return (
      <div className="inventarioContainer">
        <p>Cargando orden...</p>
      </div>
    );
  }

  // Calcular el subtotal de productos (ya viene del backend)
  const subtotalProductos = orden.detalles.reduce(
    (sum, detalle) => sum + (detalle.subtotal || 0),
    0
  );

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Detalle de Orden</h1>
          <p className="inventarioSubtitle">
            Información completa de la orden {orden.numeroOrden}
          </p>
        </div>
      </div>

      {/* Formulario de solo lectura */}
      <div className="inventarioTableSection">
        <div className="formHeader">
          <h2 className="formSectionTitle">INFORMACIÓN DE LA ORDEN</h2>
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
                type="date"
                className="formInputAdmin"
                id="fecha"
                name="fecha"
                value={orden.fecha}
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
                value={orden.clienteNombre}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="estado">
                Estado
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <span className={`badge ${getEstadoClass(orden.estado)}`}>
                  {orden.estado}
                </span>
              </div>
            </div>
          </div>

          {/* Fila 3: Costo de Envío y Monto Total */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="costoEnvio">
                Costo de Envío
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="costoEnvio"
                name="costoEnvio"
                value={formatearPrecio(orden.costoEnvio)}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="monto">
                Monto Total
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="monto"
                name="monto"
                value={formatearPrecio(orden.monto)}
                disabled
                style={{ fontWeight: "bold", fontSize: "1.1rem" }}
              />
            </div>
          </div>

          {/* Tabla de Productos */}
          <div className="formGroupAdmin" style={{ marginTop: "2rem" }}>
            <label
              className="labelFormAdmin"
              style={{ marginBottom: "1rem", display: "block" }}
            >
              Productos Comprados
            </label>

            <div className="tableResponsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Producto</th>
                    <th style={{ textAlign: "center" }}>Cantidad</th>
                    <th style={{ textAlign: "right" }}>Precio Unitario</th>
                    <th style={{ textAlign: "right" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orden.detalles.map((detalle, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "left" }}>
                        {detalle.productoNombre}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {detalle.cantidad}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {formatearPrecio(detalle.precioUnitario)}
                      </td>
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>
                        {formatearPrecio(detalle.subtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: "2px solid #ddd" }}>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      Total:
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "#2c5f2d",
                      }}
                    >
                      {formatearPrecio(orden.monto)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Botón de volver */}
          <div className="formActions" style={{ marginTop: "2rem" }}>
            <BackButton text="Volver" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowOrden;
