import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { getAllOrders } from "../../services/OrderService";
import { getUserById } from "../../services/UserService";

const UserPurchaseHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  // Cargar datos del usuario y sus órdenes
  useEffect(() => {
    const fectchUser = async () => {
      const usuarioEncontrado = await getUserById(parseInt(id));

      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);

        // Cargar órdenes del cliente desde el backend
        const todasLasOrdenes = await getAllOrders();
        const ordenesCliente = todasLasOrdenes.filter(
          orden => orden.nombreClienteSnapshot && 
          orden.nombreClienteSnapshot.includes(usuarioEncontrado.nombre)
        );
        
        // Mapear al formato esperado por la tabla
        const ordenesMapeadas = ordenesCliente.map(orden => ({
          id: orden.id,
          numeroOrden: orden.numeroOrden,
          fecha: orden.fecha,
          estado: orden.estado,
          monto: orden.montoTotal
        }));
        
        setOrdenes(ordenesMapeadas);
      } else {
        alert("Usuario no encontrado");
        navigate("/admin/usuarios");
      }
    };

    fectchUser();
  }, [id, navigate]);

  const handleVerDetalle = (ordenId) => {
    navigate(`/admin/orden/${ordenId}`);
  };

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

  if (!usuario) {
    return (
      <div className="inventarioContainer">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Historial de Compras</h1>
          <p className="inventarioSubtitle">
            {usuario.nombre} {usuario.apellido}
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="inventarioTableSection">
        {ordenes.length > 0 ? (
          <>
            <h2 className="tableTitle">Órdenes de Compra ({ordenes.length})</h2>

            {/* Tabla de órdenes */}
            <div className="tableContainer">
              <table className="productosTable">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>N° Orden</th>
                    <th style={{ textAlign: "center" }}>Fecha</th>
                    <th style={{ textAlign: "center" }}>Estado</th>
                    <th style={{ textAlign: "right" }}>Monto</th>
                    <th style={{ textAlign: "center" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.map((orden) => (
                    <tr key={orden.id}>
                      <td
                        style={{ textAlign: "left" }}
                        className="productoNombre"
                      >
                        {orden.numeroOrden}
                      </td>
                      <td
                        style={{ textAlign: "center" }}
                        className="productoCodigo"
                      >
                        {new Date(orden.fecha).toLocaleDateString("es-CL", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span
                          className={`badge ${getEstadoClass(orden.estado)}`}
                        >
                          {orden.estado}
                        </span>
                      </td>
                      <td
                        style={{ textAlign: "right" }}
                        className="productoPrecio"
                      >
                        {formatearPrecio(orden.monto)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div className="accionesButtons">
                          <button
                            onClick={() => handleVerDetalle(orden.id)}
                            className="btnAccion btnVer"
                            title="Ver Detalle"
                          >
                            👁
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              marginTop: "2rem",
            }}
          >
            <h2 style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
              Sin Historial de Compras
            </h2>
            <p style={{ color: "#adb5bd", fontSize: "1.1rem" }}>
              El usuario {usuario.nombre} {usuario.apellido} no registra
              historial de compras en el sistema.
            </p>
          </div>
        )}

        {/* Botón de volver */}
        <div className="formActions" style={{ marginTop: "2rem" }}>
          <BackButton text="Volver a Usuarios" />
        </div>
      </div>
    </div>
  );
};

export default UserPurchaseHistory;
