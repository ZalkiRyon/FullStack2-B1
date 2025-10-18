import React from "react";
import logoEmpresa from "../../assets/img/logoEmpresa.jpg";
import PrimaryButton from "../../components/common/PrimaryButton";

const LoginPage = () => {
  return (
    <main className="mainPage loginPageContainer">
      <section className="sectionEmpresaLogin">
        <div className="divLogoEmpresaLogin">
          <img
            src={logoEmpresa}
            alt="Logo empresa"
            className="imgLogoEmpresaLogin"
          />
        </div>
        <h2 className="nombreEmpresaLogin">{"Huerto Hogar"}</h2>
      </section>

      <section className="sectionLoginForm">
        <h3 className="titleFormLogin">Inicio de sesion</h3>
        <form className="formLogin" action="#" method="POST">
          <div className="formGroup">
            <label className="labelFormLogin" htmlFor="correo">
              Correo
            </label>
            <input
              type="email"
              className="formInputLogin"
              id="correo"
              name="correo"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="labelFormLogin">
              Contraseña
            </label>
            <input
              type="password"
              className="formInputLogin"
              id="password"
              name="password"
              required
            />
          </div>

          <PrimaryButton text={"INICIAR SESIÓN"} />
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
