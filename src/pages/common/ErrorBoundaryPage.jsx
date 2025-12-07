import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";

export const ErrorBoundaryPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  if (!error) {
    return <h1>Error: Objeto de error no encontrado.</h1>;
  }

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        <p>No se pudo cargar la página.</p>
        <PrimaryButton
          text="Volver a la página principal"
          width="max-content"
          onClick={handleClick}
        />
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Error de Aplicación</h1>
        <p>Hubo un problema inesperado.</p>
        <PrimaryButton
          text="Volver a la página principal"
          width="max-content"
          onClick={handleClick}
        />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Error Desconocido</h1>
      <PrimaryButton
        text="Volver a la página principal"
        width="max-content"
        onClick={handleClick}
      />
    </div>
  );
};
