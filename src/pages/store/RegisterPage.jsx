import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import Modal from "../../components/common/Modal";
import { regionesYComunas } from "../../utils/dataRegiones";
import {
  validarEmailUnico,
  validarRunUnico,
} from "../../validators/usuarioValidators";
import { createUser } from "../../services/UserService";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalSucessText, setModalSucessText] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmarPassword) {
      setModalText("Las contraseñas no coinciden");
      setIsModalOpen(true);
      return;
    }

    if (formData.password.length < 4 || formData.password.length > 10) {
      setModalText("La contraseña debe tener entre 4 y 10 caracteres");
      setIsModalOpen(true);
      return;
    }

    // Validar dominio del correo
    const dominiosPermitidos = ["@duocuc.cl", "@profesor.duoc.cl"];
    const emailValido = dominiosPermitidos.some((dominio) =>
      formData.correo.toLowerCase().endsWith(dominio)
    );

    if (!emailValido) {
      setModalText(
        "El correo debe terminar en @duocuc.cl o @profesor.duoc.cl"
      );
      setIsModalOpen(true);
      return;
    }

    // Validar que el email sea único
    if (!validarEmailUnico(formData.correo)) {
      setModalText("Este correo ya está registrado");
      setIsModalOpen(true);
      return;
    }

    // Validar que el RUN sea único
    if (!validarRunUnico(formData.run)) {
      setModalText("Este RUN ya está registrado");
      setIsModalOpen(true);
      return;
    }

    // Preparar datos del usuario (siempre como cliente)
    const datosUsuario = {
      ...formData,
      tipoUsuario: "cliente", // Siempre crear como cliente
    };

    // Guardar usuario
    try {
      const resultado = await createUser(datosUsuario);
      setModalSucessText(
        `¡Registro exitoso! Bienvenido ${resultado.usuario.nombre}`
      );
      setIsModalSucessOpen(true);
    } catch (error) {
      let errorMessage = `Error al registrar el usuario`;

      if (error.response) {
        errorMessage =
          error.response.data.message ||
          `Error del servidor (${error.response.status})`;
      }
      setModalText(errorMessage);
      setIsModalOpen(true);
    }
  };

  // Obtener comunas de la región seleccionada
  const comunasDisponibles = selectedRegion
    ? regionesYComunas[selectedRegion]?.comunas || []
    : [];

  return (
    <main className="mainPage registerPageContainer">
      <section className="sectionRegisterForm ">
        <h2 className="mb-4">Registro de Usuario</h2>
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
              placeholder="Solo correos con @duocuc.cl o @profesor.duoc.cl"
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
          <Modal
            isOpen={isModalOpen}
            title="Error"
            message={modalText}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            confirmText="Cerrar"
            showCancelButton={false}
          />

          <Modal
            isOpen={isModalSucessOpen}
            message={modalSucessText}
            onClose={() => setIsModalSucessOpen(false)}
            onConfirm={() => setIsModalSucessOpen(false)}
            confirmText="Iniciar sesion"
            to={"/inicio-sesion"}
            showCancelButton={false}
          />
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
