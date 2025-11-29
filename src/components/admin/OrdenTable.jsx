const OrdenTable = ({ ordenes, onVer, onEliminar }) => {
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

  return (
    <div className="tableContainer">
      <table className="productosTable">
        <thead>
          <tr>
            <th>Número Orden</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length > 0 ? (
            ordenes.map((orden) => {
              return (
                <tr key={orden.id}>
                  <td className="productoCodigo">{orden.numeroOrden}</td>
                  <td>{formatFecha(orden.fecha)}</td>
                  <td className="productoNombre">{orden.clienteNombre}</td>
                  <td>
                    <span
                      className={`categoriaBadge ${
                        orden.estado === "Enviado"
                          ? "estadoEnviado"
                          : orden.estado === "Procesando"
                          ? "estadoProcesando"
                          : orden.estado === "Pendiente"
                          ? "estadoPendiente"
                          : "estadoCancelado"
                      }`}
                    >
                      {orden.estado}
                    </span>
                  </td>
                  <td className="productoPrecio">{formatMonto(orden.monto)}</td>
                  <td>
                    <div className="accionesButtons">
                      {onVer && (
                        <button
                          onClick={() => onVer(orden.id)}
                          className="btnAccion btnVer"
                          title="Ver detalles"
                        >
                          👁
                        </button>
                      )}
                      {onEliminar && (
                        <button
                          onClick={() => onEliminar(orden.id)}
                          className="btnAccion btnEliminar"
                          title="Eliminar"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="noResultados">
                No se encontraron órdenes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenTable;
