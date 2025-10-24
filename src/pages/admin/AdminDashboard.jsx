import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { usuario } = useAuth();

  // Obtener el nombre completo del usuario o usar placeholder
  const userName = usuario
    ? `${usuario.nombre} ${usuario.apellido}`
    : "Nombre Usuario";

  return (
    <div className="adminDashboardContainer">
      <h1 className="adminWelcomeTitle">¡HOLA {userName.toUpperCase()}!</h1>
    </div>
  );
};

export default AdminDashboard;
