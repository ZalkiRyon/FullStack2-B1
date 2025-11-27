import { useAuth } from "../../context/AuthContext";

const PerfilPage = () => {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <div className="inventarioContainer">
        <div className="inventarioHeader">
          <div className="inventarioTitleSection">
            <h1 className="inventarioTitle">Perfil de Usuario</h1>
            <p className="inventarioSubtitle">No hay usuario autenticado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Perfil de Usuario</h1>
          <p className="inventarioSubtitle">
            Información personal de {usuario.nombre} {usuario.apellido}
          </p>
        </div>
      </div>

      {/* Sección de contenido */}
      <div className="inventarioTableSection">
        <h2 className="tableTitle">Datos Personales</h2>
        
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <strong>Nombre Completo:</strong> {usuario.nombre} {usuario.apellido}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Email:</strong> {usuario.email}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>RUN:</strong> {usuario.run}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Teléfono:</strong> {usuario.telefono}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Región:</strong> {usuario.region}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Comuna:</strong> {usuario.comuna}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Dirección:</strong> {usuario.direccion}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Rol:</strong> {usuario.roleNombre}
          </div>
          {usuario.comentario && (
            <div style={{ marginBottom: "15px" }}>
              <strong>Comentario:</strong> {usuario.comentario}
            </div>
          )}
          <div style={{ marginBottom: "15px" }}>
            <strong>Fecha de Registro:</strong>{" "}
            {new Date(usuario.fechaRegistro).toLocaleDateString("es-CL")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;