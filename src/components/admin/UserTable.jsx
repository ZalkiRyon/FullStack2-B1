const UserTable = ({ usuarios, onVer, onEditar, onHistorial }) => {
  return (
    <div className="tableContainer">
      <table className="productosTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => {
              return (
                <tr key={usuario.id}>
                  <td className="productoNombre">
                    {`${usuario.nombre} ${usuario.apellido}`}
                  </td>
                  <td>
                    <span
                      className={`categoriaBadge ${
                        usuario.roleNombre === "admin"
                          ? "rolAdmin"
                          : usuario.role === "vendedor"
                          ? "rolVendedor"
                          : "rolCliente"
                      }`}
                    >
                      {usuario.roleNombre.charAt(0).toUpperCase() +
                        usuario.roleNombre.slice(1)}
                    </span>
                  </td>
                  <td className="productoCodigo">{usuario.email}</td>
                  <td className="productoCodigo">{usuario.telefono}</td>
                  <td>
                    <div className="accionesButtons">
                      {onVer && (
                        <button
                          onClick={() => onVer(usuario.id)}
                          className="btnAccion btnVer"
                          title="Ver"
                        >
                          👁
                        </button>
                      )}
                      {onEditar && (
                        <button
                          onClick={() => onEditar(usuario.id)}
                          className="btnAccion btnEditar"
                          title="Editar"
                        >
                          ✏
                        </button>
                      )}
                      {onHistorial && (
                        <button
                          onClick={() => onHistorial(usuario.id)}
                          className="btnAccion btnHistorial"
                          title="Historial de Compras"
                        >
                          📋
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="noResultados">
                No se encontraron usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
