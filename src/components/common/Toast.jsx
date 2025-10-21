import { useEffect, useState } from "react";
import close from "../../assets/img/close.svg";

// Existen 3 tipos, success (verde), error(rojo), info(azul)

const Toast = ({ id, message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => onClose(id), 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const toastClasses = [
    "toastNotification",
    `toast-${type}`,
    isVisible ? "toastShow" : "toastHide",
  ].join(" ");

  return (
    <div className={toastClasses}>
      <p className="toastMessage">{message}</p>
      <button className="toastCloseBtn" onClick={() => onClose(id)}>
        <img src={close} alt="icon-close" className="closeToast" />
      </button>
    </div>
  );
};

export default Toast;
