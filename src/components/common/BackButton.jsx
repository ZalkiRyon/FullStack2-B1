import { useNavigate } from "react-router-dom";
import "../../styles/common.css";

/**
 * Componente de botón para volver a la página anterior
 * Usa navigate(-1) para regresar a la página desde donde se llegó
 *
 * @param {string} text - Texto del botón (opcional, por defecto "Volver")
 * @param {string} width - Ancho del botón (opcional, por defecto "auto")
 * @param {string} height - Alto del botón (opcional, por defecto "auto")
 */
const BackButton = ({ text = "Volver", width = "auto", height = "auto" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const dynamicStyles = {
    width: width,
    height: height,
  };

  return (
    <button
      type="button"
      className="backButton"
      style={dynamicStyles}
      onClick={handleBack}
    >
      {text}
    </button>
  );
};

export default BackButton;
