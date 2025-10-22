import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import { saveUsuarioToStorage } from "../../utils/dataUsuarios";
import { regionesYComunas } from "../../utils/dataRegiones";
import { validarEmailUnico, validarRunUnico } from "../../validators/usuarioValidators";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    run: "",
    fechaNacimiento: "",
    correo: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
    region: "",
    comuna: "",
    direccion: "",
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

    // Preparar datos del usuario (siempre como cliente)
    const datosUsuario = {
      ...formData,
      tipoUsuario: "cliente", // Siempre crear como cliente
    };

    // Guardar usuario
    const resultado = saveUsuarioToStorage(datosUsuario);
    
    if (resultado.success) {
      alert(`¡Registro exitoso! Bienvenido ${resultado.usuario.nombre}`);
      navigate("/inicio-sesion");
    } else {
      alert(`Error al registrar usuario: ${resultado.error}`);
    }
  };

  // Obtener comunas de la región seleccionada
  const comunasDisponibles = selectedRegion
    ? regionesYComunas[selectedRegion]?.comunas || []
    : [];

  return (
    <main className="mainPage registerPageContainer">
      <section className="sectionRegisterForm">
        <h3 className="titleFormRegister">Registro de Usuario</h3>
        <form className="formRegister" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="nombre">
              NOMBRE
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Apellido */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="apellido">
              APELLIDO
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* RUN */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="run">
              RUN
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="run"
              name="run"
              placeholder="Ej: 12.345.678-9"
              value={formData.run}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="fechaNacimiento">
              FECHA DE NACIMIENTO (opcional)
            </label>
            <input
              type="date"
              className="formInputRegister"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </div>

          {/* Correo */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="correo">
              CORREO
            </label>
            <input
              type="email"
              className="formInputRegister"
              id="correo"
              name="correo"
              placeholder="Solo correos con @duoc.cl, @profesor.duoc.cl y @gmail.com"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="telefono">
              TELEFONO (opcional)
            </label>
            <input
              type="tel"
              className="formInputRegister"
              id="telefono"
              name="telefono"
              placeholder="Solo números, máximo 10 dígitos"
              maxLength="10"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </div>

          {/* Contraseña */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="password">
              CONTRASEÑA
            </label>
            <input
              type="password"
              className="formInputRegister"
              id="password"
              name="password"
              placeholder="........"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="confirmarPassword">
              CONFIRMAR CONTRASEÑA
            </label>
            <input
              type="password"
              className="formInputRegister"
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Región y Comuna en la misma fila */}
          <div className="formGroupRow">
            <div className="formGroup formGroupHalf">
              <label className="labelFormRegister" htmlFor="region">
                REGIÓN
              </label>
              <select
                className="formInputRegister formSelectRegister"
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

            <div className="formGroup formGroupHalf">
              <label className="labelFormRegister" htmlFor="comuna">
                COMUNA
              </label>
              <select
                className="formInputRegister formSelectRegister"
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
          <div className="formGroup">
            <label className="labelFormRegister" htmlFor="direccion">
              DIRECCIÓN
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="direccion"
              name="direccion"
              placeholder="Ej: Av. Providencia 1234, Depto 56"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Botón de registro */}
          <PrimaryButton text={"REGISTRAR"} type="submit" />
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
