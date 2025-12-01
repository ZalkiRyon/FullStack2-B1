import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import { regionesYComunas } from "../../utils/dataRegiones";
import { validarFormatoRun } from "../../validators/usuarioValidators";
import { getUserById, updateUserById } from "../../services/UserService";
import { validateEmail } from "../../services/RegisterService";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [emailOriginal, setEmailOriginal] = useState("");
  const [runOriginal, setRunOriginal] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    run: "",
    fechaNacimiento: "",
    roleNombre: "",
    email: "",
    telefono: "",
    region: "",
    comuna: "",
    direccion: "",
    comentario: "",
  });

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      const usuarioEncontrado = await getUserById(parseInt(id));

      if (usuarioEncontrado) {
        setFormData({
          nombre: usuarioEncontrado.nombre,
          apellido: usuarioEncontrado.apellido,
          run: usuarioEncontrado.run,
          fechaNacimiento: usuarioEncontrado.fechaNacimiento || "",
          roleNombre: usuarioEncontrado.roleNombre,
          email: usuarioEncontrado.email,
          telefono: usuarioEncontrado.telefono || "",
          region: usuarioEncontrado.region,
          comuna: usuarioEncontrado.comuna,
          direccion: usuarioEncontrado.direccion,
          comentario: usuarioEncontrado.comentario || "",
          password: usuarioEncontrado.password,
        });

        setSelectedRegion(usuarioEncontrado.region);
        setEmailOriginal(usuarioEncontrado.email);
        setRunOriginal(usuarioEncontrado.run);
      } else {
        alert("Usuario no encontrado");
        navigate("/admin/usuarios");
      }
    };

    fetchUser();
  }, [id, navigate]);

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

  const ROLE_NAME_TO_ID = {
    admin: 1,
    cliente: 2,
    vendedor: 3,
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      alert("El nombre y apellido son obligatorios");
      return;
    }

    if (!formData.email.trim()) {
      alert("El correo es obligatorio");
      return;
    }

    // Validar dominio del correo
    const dominiosPermitidos = ["@duocuc.cl", "@profesor.duoc.cl"];
    const emailValido = dominiosPermitidos.some((dominio) =>
      formData.email.toLowerCase().endsWith(dominio)
    );

    if (!emailValido) {
      alert("El correo debe terminar en @duocuc.cl, @profesor.duoc.cl");
      return;
    }

    // Validar que el email sea único
    if (formData.run && !validarFormatoRun(formData.run)) {
      alert(
        "El formato del RUN es incorrecto. Debe ser XX.XXX.XXX-X o X.XXX.XXX-X"
      );
      return;
    }

    const roleIdToSend = ROLE_NAME_TO_ID[formData.roleNombre];

    if (!roleIdToSend) {
      alert("Error: Tipo de usuario no válido.");
      return;
    }

    try {
      // Solo validar disponibilidad del email si cambió
      if (formData.email.toLowerCase() !== emailOriginal.toLowerCase()) {
        const emailValidationResult = await validateEmail(formData.email);

        if (emailValidationResult.valid === false) {
          alert(emailValidationResult.message || "Error de formato de correo.");
          return;
        }

        if (emailValidationResult.available === false) {
          alert(
            emailValidationResult.message || "Este correo ya está registrado."
          );
          return;
        }
      }

      const userNew = {
        ...formData,
        nombre: formData.nombre,
        apellido: formData.apellido,
        run: formData.run,
        fechaNacimiento: formData.fechaNacimiento,
        role_id: roleIdToSend,
        email: formData.email,
        telefono: formData.telefono,
        region: formData.region,
        comuna: formData.comuna,
        direccion: formData.direccion,
        comentario: formData.comentario,
      };

      const res = await updateUserById(parseInt(id), userNew);

      if (res) {
        alert(
          `Usuario actualizado exitosamente\n\nLos datos de ${formData.nombre} ${formData.apellido} han sido actualizados.`
        );
        navigate("/admin/usuarios");
      } else {
        alert("Error no se pudo actualizar el usuario");
      }
    } catch (error) {
      alert(`Error al actualizar usuario\n\nDetalle: ${error.message}`);
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
          <h1 className="inventarioTitle">Editar Usuario</h1>
        </div>
      </div>

      {/* Formulario */}
      <div className="inventarioTableSection">
        <div className="formHeader">
          <h2 className="formSectionTitle">MODIFICAR DATOS DEL USUARIO</h2>
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
            <label className="labelFormAdmin" htmlFor="role">
              TIPO DE USUARIO
            </label>
            <select
              className="formInputAdmin formSelectAdmin"
              id="roleNombre"
              name="roleNombre"
              value={formData.roleNombre}
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
            <label className="labelFormAdmin" htmlFor="email">
              CORREO
            </label>
            <input
              type="email"
              className="formInputAdmin"
              id="email"
              name="email"
              placeholder="Solo correos con @duocuc.cl, @profesor.duoc.cl"
              value={formData.email}
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

          {/* Botones de acción */}
          <div className="formActionsGroup">
            <BackButton text="Volver" />
            <button type="submit" className="btnGuardarCambios">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
