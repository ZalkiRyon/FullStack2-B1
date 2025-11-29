import React from "react";
import { Link } from "react-router-dom";
import "../../styles/common.css";

// Boton principal color verde que sirve para acciones claves
// to -> recibe un String que es en caso que se quiera hacer que rediriga
// onClick -> recibe una Function cuando se haga click
// text -> el Texto que tendra el boton
// width -> en caso que se le quiera dar uno en particular de otra forma sera 100%
// height -> altura que se le queira dar, de otra forma sera automatico siempre
// type -> tipo de botón (button, submit, reset) - por defecto "button"

// color -> default(esmeralda), error(rojo), none(gris)
// disabled -> deshabilita el botón
const PrimaryButton = ({
  to,
  onClick,
  text,
  width = "100%",
  height = "auto",
  type = "button",
  color = "default",
  disabled = false
}) => {
  
  const dynamicStyles = {
    width: width,
    height: height,
  };

  const buttonClass = `primaryButton primaryButton-${color} ${disabled ? 'primaryButton-disabled' : ''}`;

  if (to) {
    return (
      <Link
        to={to}
        type={type}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        style={dynamicStyles}
        className={buttonClass}
      >
        {text}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={dynamicStyles}
      className={buttonClass}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
