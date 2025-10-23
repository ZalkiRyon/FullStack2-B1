import React, { useState } from "react";
import logoEmpresa from "../../assets/img/logoEmpresa.jpg";
import PrimaryButton from "../../components/common/PrimaryButton";
import Modal from "../../components/common/Modal";

const ContactPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <main className="mainPage loginPageContainer">
      <section className="sectionEmpresaContacto">
        <div className="divLogoEmpresa">
          <img
            src={logoEmpresa}
            alt="Logo empresa"
            className="imgLogoEmpresa"
          />
        </div>
        <h2>Huertix</h2>
      </section>
      <section className="sectionContacto">
        <h3 className="titleForm">Formulario de contactos</h3>
        <form className="formContacto" action="#" method="POST">
          <div className="mb-3">
            <label className="labelForm" htmlFor="name">
              NOMBRE COMPLETO
            </label>
            <input
              type="text"
              className="formInput"
              id="name"
              name="name"
              maxLength="100"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="labelForm">
              CORREO
            </label>
            <input
              type="text"
              className="formInput"
              id="email"
              name="email"
              maxLength="100"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comment" className="labelForm">
              COMENTARIO
            </label>
            <input
              type="text"
              className="formInput"
              id="comment"
              name="comment"
              maxLength="100"
              required
            />
          </div>
          <PrimaryButton text="Enviar mensaje" onClick={handleOpenModal} />
        </form>
      </section>
      <Modal
        isOpen={isOpen}
        title="Enviado"
        message="Mensaje enviado exitosamente."
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        confirmText="Cerrar"
        showCancelButton={false}
      />
    </main>
  );
};

export default ContactPage;
