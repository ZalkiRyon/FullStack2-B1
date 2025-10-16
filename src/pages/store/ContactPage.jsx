import React from "react";
import logoEmpresa from "../../assets/img/logoEmpresa.jpg";
import PrimaryButton from "../../components/common/PrimaryButton";

const ContactPage = () => {
  return (
    <main className="mainPage">
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
            <label className="labelForm" for="name" >
              Nombre completo
            </label>
            <input
              type="text"
              className="formInput"
              id="username"
              name="username"
              required
            />
          </div>

          <div className="mb-3">
            <label for="username" className="labelForm" >
              Correo
            </label>
            <input
              type="text"
               className="formInput"
              id="username"
              name="username"
              required
            />
          </div>

          <div className="mb-3">
            <label for="password" className="labelForm" >
              Contenido
            </label>
            <input
              type="password"
              className="formInput"
              id="password"
              name="password"
              required
            />
          </div>
          <PrimaryButton text={"Enviar mensaje"} />
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
