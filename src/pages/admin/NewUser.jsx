import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import { regionesYComunas, saveUsuarioToStorage, validarEmailUnico, validarRunUnico } from "../../utils/data";

const NewUser = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    run: "",
    fechaNacimiento: "",
    tipoUsuario: "",
    correo: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
    region: "",
    comuna: "",
    direccion: "",
    comentario: "",
  });

  // Manejar cambio de región para actualizar comunas
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setFormData({ ...formData, region: region, comuna: "" });
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 4 || formData.password.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres");
      return;
    }

    // Validar dominio del correo
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const emailValido = dominiosPermitidos.some(dominio => 
      formData.correo.toLowerCase().endsWith(dominio)
    );
    
    if (!emailValido) {
      alert("El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }

    // Validar que el email sea único
    if (!validarEmailUnico(formData.correo)) {
      alert("Este correo ya está registrado");
      return;
    }

    // Validar que el RUN sea único
    if (!validarRunUnico(formData.run)) {
      alert("Este RUN ya está registrado");
      return;
    }

    // Guardar usuario
    const resultado = saveUsuarioToStorage(formData);
    
    if (resultado.success) {
      alert(`Usuario creado exitosamente`);
      navigate("/admin/usuarios");
    } else {
      alert(`Error al crear usuario: ${resultado.error}`);
    }
  };

  // Obtener comunas de la región seleccionada
  const comunasDisponibles = selectedRegion
    ? regionesYComunas[selectedRegion]?.comunas || []
    : [];

  return (
    <div className="inventarioContainer">
      {/* Header */}
      <div className="inventarioHeader">
        <div className="inventarioTitleSection">
          <h1 className="inventarioTitle">Nuevo Usuario</h1>
        </div>
      </div>

      {/* Formulario */}
      <div className="inventarioTableSection">
        <div className="formHeader">
          <h2 className="formSectionTitle">REGISTRO DE USUARIO</h2>
        </div>

        <form className="formAdmin" onSubmit={handleSubmit}>
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
              value={formData.nombre}
              onChange={handleInputChange}
              required
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
              value={formData.apellido}
              onChange={handleInputChange}
              required
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
              placeholder="Ej: 12.345.678-9"
              value={formData.run}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="fechaNacimiento">
              FECHA DE NACIMIENTO (OPCIONAL)
            </label>
            <input
              type="date"
              className="formInputAdmin"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </div>

          {/* Tipo de Usuario */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="tipoUsuario">
              TIPO DE USUARIO
            </label>
            <select
              className="formInputAdmin formSelectAdmin"
              id="tipoUsuario"
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar tipo de usuario...</option>
              <option value="admin">Admin</option>
              <option value="vendedor">Vendedor</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>

          {/* Correo */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="correo">
              CORREO
            </label>
            <input
              type="email"
              className="formInputAdmin"
              id="correo"
              name="correo"
              placeholder="Solo correos con @duoc.cl, @profesor.duoc.cl y @gmail.com"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="telefono">
              TELEFONO (OPCIONAL)
            </label>
            <input
              type="tel"
              className="formInputAdmin"
              id="telefono"
              name="telefono"
              placeholder="Solo números, máximo 10 dígitos"
              maxLength="10"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </div>

          {/* Contraseña */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="password">
              CONTRASEÑA
            </label>
            <input
              type="password"
              className="formInputAdmin"
              id="password"
              name="password"
              placeholder="Entre 4 a 10 caracteres"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="confirmarPassword">
              CONFIRMAR CONTRASEÑA
            </label>
            <input
              type="password"
              className="formInputAdmin"
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Región y Comuna en la misma fila */}
          <div className="formGroupRow">
            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="region">
                REGIÓN
              </label>
              <select
                className="formInputAdmin formSelectAdmin"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleRegionChange}
                required
              >
                <option value="">Seleccionar región...</option>
                {Object.keys(regionesYComunas).map((key) => (
                  <option key={key} value={key}>
                    {regionesYComunas[key].nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroupAdmin formGroupHalf">
              <label className="labelFormAdmin" htmlFor="comuna">
                COMUNA
              </label>
              <select
                className="formInputAdmin formSelectAdmin"
                id="comuna"
                name="comuna"
                value={formData.comuna}
                onChange={handleInputChange}
                disabled={!selectedRegion}
                required
              >
                <option value="">Seleccionar comuna...</option>
                {comunasDisponibles.map((comuna) => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>
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
              placeholder="Ej: Av. Providencia 1234, Depto 56"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Comentario */}
          <div className="formGroupAdmin">
            <label className="labelFormAdmin" htmlFor="comentario">
              COMENTARIO
            </label>
            <textarea
              className="formInputAdmin formTextareaAdmin"
              id="comentario"
              name="comentario"
              rows="4"
              placeholder="Ingrese comentarios adicionales sobre el usuario..."
              value={formData.comentario}
              onChange={handleInputChange}
            />
          </div>

          {/* Botón de registro */}
          <div className="formActions">
            <PrimaryButton text={"REGISTRAR"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
