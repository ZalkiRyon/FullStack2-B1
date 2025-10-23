import React, { useState, useEffect } from "react";
import { regionesYComunas } from "../../utils/dataRegiones";


const DeliveryForm = ({ formData, setFormData, handleFormChange }) => {
  const [selectedRegion, setSelectedRegion] = useState(formData.region || "");


  useEffect(() => {
    if (formData.region && formData.region !== selectedRegion) {
      setSelectedRegion(formData.region);
    }

  

  }, [formData.region]);

  const comunasDisponibles = selectedRegion
    ? regionesYComunas[selectedRegion]?.comunas || []
    : [];

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);

    setFormData((prevData) => ({
      ...prevData,
      region: region,
      comuna: "",
    }));
  };

  return (
    <div>
      <div className="deliveryForm" style={{ borderBottom: "1px solid #eee" }}>
        <h3>Datos de contacto</h3>

        <div className="formRow">
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="name">
              Nombre*
            </label>
            <input
              type="text"
              className="formInputDelivery"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="lastname">
              Apellidos*
            </label>
            <input
              type="text"
              className="formInputDelivery"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleFormChange}
              required
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="correo">
              Correo*
            </label>
            <input
              type="email"
              className="formInputDelivery"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="deliveryForm">
        <h3>Direccion de entrega de los productos</h3>

        <div className="formRow">
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="direction">
              Calle*
            </label>
            <input
              type="text"
              className="formInputDelivery"
              id="direction"
              name="direction"
              value={formData.direction}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="department">
              Departamento (opcional)
            </label>
            <input
              type="text"
              className="formInputDelivery"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleFormChange}
            
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="region">
              Region*
            </label>
            <select
              className="formInputDelivery formSelectDelivery"
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
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="comuna">
              COMUNA
            </label>
            <select
              className="formInputDelivery formSelectDelivery"
              id="comuna"
              name="comuna"
              value={formData.comuna}
              onChange={handleFormChange}
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
        <div className="formRow">
          <div className="formField">
            <label className="labelFormDelivery" htmlFor="comment">
              Indicaciones para la entrega (opcional)
            </label>
            <input
              type="text"
              className="formInputDelivery"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleFormChange}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
