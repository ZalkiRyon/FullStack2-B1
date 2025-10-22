import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { getUsuariosFromStorage } from "../../utils/dataUsuarios";
import { regionesYComunas } from "../../utils/dataRegiones";

const ShowUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  // Cargar datos del usuario
  useEffect(() => {
    const usuarios = getUsuariosFromStorage();
    const usuarioEncontrado = usuarios.find(u => u.id === parseInt(id));
    
    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
    } else {
      alert("Usuario no encontrado");
      navigate("/admin/usuarios");
    }
  }, [id, navigate]);

  // Obtener nombre de la región
  const getNombreRegion = (regionKey) => {
    return regionesYComunas[regionKey]?.nombre || regionKey;
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
          <h1 className="inventarioTitle">Detalles del Usuario</h1>
        </div>
      </div>

      {/* Formulario de visualización */}
      <div className="inventarioTableSection">
        <div className="formHeader">
          <h2 className="formSectionTitle">INFORMACIÓN DEL USUARIO</h2>
        </div>

        <div className="formAdmin">
          {/* Nombre */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="nombre">
              NOMBRE
            </label>
            <input
              type="text"
              className="formInputAdmin"
              id="nombre"
              name="nombre"
              value={usuario.nombre}
              disabled
            />
          </div>

          {/* Apellido */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="apellido">
              APELLIDO
            </label>
            <input
              type="text"
              className="formInputAdmin"
              id="apellido"
              name="apellido"
              value={usuario.apellido}
              disabled
            />
          </div>

          {/* RUN */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="run">
              RUN
            </label>
            <input
              type="text"
              className="formInputAdmin"
              id="run"
              name="run"
              value={usuario.run}
              disabled
            />
          </div>

          {/* Fecha de Nacimiento */}
          {usuario.fechaNacimiento && (
            <div className="formGroupAdmin">
              <label className="labelFormAdmin" htmlFor="fechaNacimiento">
                FECHA DE NACIMIENTO
              </label>
              <input
                type="date"
                className="formInputAdmin"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={usuario.fechaNacimiento}
                disabled
              />
            </div>
          )}

          {/* Tipo de Usuario */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="role">
              TIPO DE USUARIO
            </label>
            <input
              type="text"
              className="formInputAdmin"
              id="role"
              name="role"
              value={usuario.role.charAt(0).toUpperCase() + usuario.role.slice(1)}
              disabled
            />
          </div>

          {/* Correo */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="email">
              CORREO
            </label>
            <input
              type="email"
              className="formInputAdmin"
              id="email"
              name="email"
              value={usuario.email}
              disabled
            />
          </div>

          {/* Teléfono */}
          {usuario.telefono && (
            <div className="formGroupAdmin">
              <label className="labelFormAdmin" htmlFor="telefono">
                TELÉFONO
              </label>
              <input
                type="tel"
                className="formInputAdmin"
                id="telefono"
                name="telefono"
                value={usuario.telefono}
                disabled
              />
            </div>
          )}

          {/* Región y Comuna en la misma fila */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="region">
                REGIÓN
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="region"
                name="region"
                value={getNombreRegion(usuario.region)}
                disabled
              />
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="comuna">
                COMUNA
              </label>
              <input
                type="text"
                className="formInputAdmin"
                id="comuna"
                name="comuna"
                value={usuario.comuna}
                disabled
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="direccion">
              DIRECCIÓN
            </label>
            <input
              type="text"
              className="formInputAdmin"
              id="direccion"
              name="direccion"
              value={usuario.direccion}
              disabled
            />
          </div>

          {/* Comentario */}
          {usuario.comentario && (
            <div className="formGroupAdmin">
              <label className="labelFormAdmin" htmlFor="comentario">
                COMENTARIO
              </label>
              <textarea
                className="formInputAdmin formTextareaAdmin"
                id="comentario"
                name="comentario"
                rows="4"
                value={usuario.comentario}
                disabled
              />
            </div>
          )}

          {/* Fecha de Registro */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="fechaRegistro">
              FECHA DE REGISTRO
            </label>
            <input
              type="text"
              className="formInputAdmin"
              id="fechaRegistro"
              name="fechaRegistro"
              value={new Date(usuario.fechaRegistro).toLocaleString('es-CL')}
              disabled
            />
          </div>

          {/* Botón de volver */}
          <div className="formActions">
            <BackButton text="Volver" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
