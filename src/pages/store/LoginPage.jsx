import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoEmpresa from "../../assets/img/logoEmpresa.jpg";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { getAllUsers } from "../../services/UserService";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    const fecthUsers = async () => {
      const allUsers = await getAllUsers();
      setUsuarios(allUsers);
    };

    fecthUsers();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (!formData.correo.trim() || !formData.password.trim()) {
      setError("Por favor, complete todos los campos");
      return;
    }

    // Buscar usuario con el correo ingresado
    const usuario = usuarios.find((u) => u.email === formData.correo);

    if (!usuario) {
      setError("Correo electrónico no registrado");
      return;
    }

    // Verificar contraseña
    if (usuario.password !== formData.password) {
      setError("Contraseña incorrecta");
      return;
    }

    // Login exitoso
    login(usuario);
    console.log(usuario);
    // Redirigir según el rol
    if (usuario.roleNombre === "admin") {
      navigate("/admin");
    } else {
      navigate("/"); // Redirigir a la tienda para clientes
    }
  };

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
        <h2>Huertix</h2>
      </section>

      <section className="sectionLoginForm">
        <h3 className="titleFormLogin">Inicio de sesion</h3>
        <form className="formLogin" onSubmit={handleSubmit}>
          {error && <div className="loginError">{error}</div>}

          <div className="formGroup">
            <label className="labelFormLogin" htmlFor="correo">
              CORREO
            </label>
            <input
              type="email"
              className="formInputLogin"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="labelFormLogin">
              CONTRASEÑA
            </label>
            <input
              type="password"
              className="formInputLogin"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <PrimaryButton text={"INICIAR SESIÓN"} type="submit" />
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
