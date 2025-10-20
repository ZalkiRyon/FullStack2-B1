import PrimaryButton from "./PrimaryButton";
import close from "../../assets/img/close.svg";

const Modal = ({
  isOpen,
  message,
  onClose,
  onConfirm,
  title = "Confirmación",
  confirmText = "Aceptar",
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
            <img src={close} alt="icon-close" />
          </button>
        </div>

        <div className="modalBody">
          <p>{message}</p>
        </div>

        <div className="modalFooter">
          <button className="btnCancel" onClick={handleCancel}>
            Cancelar
          </button>

          <PrimaryButton onClick={handleConfirm} text={confirmText} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
