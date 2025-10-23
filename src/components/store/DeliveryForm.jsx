import React, { useState } from "react";
import OrdenSummary from "./OrdenSummary";
import { useAuth } from "../../context/AuthContext";
import { regionesYComunas } from "../../utils/dataRegiones";

const DeliveryForm = () => {
  const { usuario } = useAuth();

  const [selectedRegion, setSelectedRegion] = useState(usuario.region || "");

  const [formData, setFormData] = useState({
    name: usuario.nombre || "",
    lastname: usuario.apellido || "",
    email: usuario.email || "",
    direction: usuario.direccion || "",
    department: "",
    telefono: usuario.telefono || "",
    region: selectedRegion || "",
    comuna: usuario.comuna || "",
    comment: "",
  });

  // Obtener comunas de la región seleccionada
  const comunasDisponibles = selectedRegion
    ? regionesYComunas[selectedRegion]?.comunas || []
    : [];

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setFormData({ ...formData, region: region, comuna: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-wrapper">
      <div>
        <h3>Datos de contacto</h3>
        <div>
          <div>
            <label className="labelFormRegister" htmlFor="name">
              Nombre*
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="labelFormRegister" htmlFor="lastname">
              Apellidos*
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="labelFormRegister" htmlFor="correo">
              Correo*
            </label>
            <input
              type="email"
              className="formInputRegister"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
      <div>
        <h3>Direccion de entrega de los productos</h3>
        <div>
          <div>
            <label className="labelFormRegister" htmlFor="direction">
              Calle*
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="direction"
              name="direction"
              value={formData.direction}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="labelFormRegister" htmlFor="department">
              Departamento (opcional)
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="labelFormRegister" htmlFor="region">
              Region*
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
          <div>
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
          <div>
            <label className="labelFormRegister" htmlFor="comment">
              Indicaciones para la entrega (opcional)
            </label>
            <input
              type="text"
              className="formInputRegister"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeliveryForm;
