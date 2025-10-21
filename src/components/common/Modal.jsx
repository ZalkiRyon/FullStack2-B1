import PrimaryButton from "./PrimaryButton";
import close from "../../assets/img/close.svg";

const Modal = ({
  isOpen,
  message,
  onClose,
  onConfirm,
  title = "Confirmación",
  confirmText = "Aceptar",
  showCancelButton = true,
  to,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modalOverlay" onClick={handleCancel}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        
        <div className="modalHeader">
          <h3>{title}</h3>
          <button className="modalCloseBtn" onClick={handleCancel}>
            <img src={close} alt="icon-close" className="closeModal"/>
          </button>
        </div>

        <div className="modalBody">
          <p>{message}</p>
        </div>

        <div className="modalFooter">
          {showCancelButton && (
            <button className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
          )}

          <PrimaryButton onClick={handleConfirm} text={confirmText} to={to} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
